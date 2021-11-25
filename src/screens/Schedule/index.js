import React, { useState, useEffect } from 'react';
import { Container, Scroller, HeaderArea, HeaderTitle, Name, PageBody, LoadingIcon, ListArea, OrganizationArea, ButtonArea, ScheduleArea, ScheduleTitle, Line, FlatArea, DateTitle } from './styles';
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
    const [name, setName] = useState("");

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
        pegarNome();
    }, []);

    const onRefresh = () => {
        setRefreshing(true); 
    }

    const handleClick = () => {
        navigation.reset({
            routes: [{name: 'AddSchedule'}]
        });
    }

    const pegarNome = async () => {
        setName(await AsyncStorage.getItem('nome'));
    }

    const DateTransformer = (dateTransformer) => {
        let date = new Date(dateTransformer);

        let arrayData = date.toLocaleDateString('pt-BR').substring(0, date.toLocaleDateString('pt-BR').lastIndexOf('/')).split('/');
        return arrayData[1] + '/' + arrayData[0];
    }

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <HeaderArea>
                    <HeaderTitle>HAPPY PET</HeaderTitle>
                    <Name>Olá, {name.substring(0, name.indexOf(' ') == -1 ? name.length : name.indexOf(' '))}!</Name>
                </HeaderArea>

                <PageBody>
                    <ScheduleArea>
                        <OrganizationArea>
                            <ScheduleTitle>Serviços agendados</ScheduleTitle>
                            <ButtonArea onPress={handleClick}>
                                <AddIcon width="28" height="28" fill="#00B1E1" />
                            </ButtonArea>
                        </OrganizationArea>
                    </ScheduleArea>

                    {loading &&
                        <LoadingIcon 
                            size='large'
                            color='#20283D'
                        />
                    }

                    {list.map((item, k) => 
                        <FlatArea>
                            <DateTitle>{DateTransformer(item.date)}</DateTitle>
                            <ListArea>
                                {item.agendas.length != 0 ? 
                                    <FlatList 
                                        horizontal
                                        pagingEnabled={true}
                                        showsHorizontalScrollIndicator={false}
                                        legacyImplementation={false}
                                        data={item.agendas}
                                        keyExtractor={(item) => item.id}
                                        renderItem={ ({item}) => <ScheduleItem data={item} funcRefresh={getSchedule}/>}
                                    />
                                :
                                    <Text>Não há serviços agendados para você.</Text>
                                }
                            </ListArea>

                            <Line />
                        </FlatArea>
                    )}
                </PageBody>
            </Scroller>
        </Container>
    );
}