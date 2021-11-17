import React, { useState, useEffect } from 'react';
import { Container, Scroller, HeaderArea, HeaderTitle, PageBody, LoadingIcon, ListArea, OrganizationArea, ButtonArea, ScheduleArea, ScheduleTitle } from './styles';
import { RefreshControl, FlatList, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

import Api from '../../Api';
import ScheduleItem from '../../components/ScheduleItem';

import AddIcon from '../../images/add2.svg';

export default () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();

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

    const handleClick = () => {
        navigation.reset({
            routes: [{name: 'AddSchedule'}]
        });
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
                    <ScheduleArea>
                        <OrganizationArea>
                            <ScheduleTitle>Agenda</ScheduleTitle>
                            <ButtonArea onPress={handleClick}>
                                <AddIcon width="28" height="28" fill="#00B1E1" />
                            </ButtonArea>
                        </OrganizationArea>

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
                                    renderItem={ ({item}) => <ScheduleItem data={item} funcRefresh={getSchedule}/>}
                                />
                            :
                                <Text>Não há serviços agendados para você.</Text>
                            }
                        </ListArea>
                    </ScheduleArea>
                </PageBody>
            </Scroller>
        </Container>
    );
}