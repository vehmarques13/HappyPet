import React, { useState, useEffect } from 'react';
import { Container, Scroller, HeaderArea, HeaderTitle, PageBody, LoadingIcon, ListArea, BackButton } from './styles';
import { RefreshControl, FlatList, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Api from '../../Api';
import { Alert } from 'react-native';
import ScheduleItem from '../../components/ScheduleItem';

export default () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getSchedule = async () => {
        setLoading(true);
        setList([]);

        let email = await AsyncStorage.getItem('email');
        let res = await Api.getSchedule(email);

        if (res.error == undefined) 
            setList(res);
        else 
            Alert('Erro: ' + res.error);

        setLoading(false);
    }


    useEffect(() => {
        getSchedule();
    }, []);

    const onRefresh = () => {
        setRefreshing(true); 
    }

    const handleGoBackButton = () => {
        navigation.goBack();
    }

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <HeaderArea>
                    <HeaderTitle>HAPPY PET</HeaderTitle>
                </HeaderArea>

                <PageBody>
                    {loading &&
                        <LoadingIcon 
                            size='large'
                            color='#20283D'
                        />
                    }

                    <ListArea>
                    {list.length != 0 ? 
                        <FlatList 
                            horizontal
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            legacyImplementation={false}
                            data={list}
                            keyExtractor={(item) => item.id}
                            renderItem={ ({item}) => <ScheduleItem data={item}/>}
                        />
                    :
                        <Text>Não há serviços agendados para você.</Text>
                    }
                    </ListArea>
                </PageBody>
            </Scroller>
        </Container>
    );
}