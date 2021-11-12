import React, { useState, useEffect } from 'react';
import { Container, Scroller, HeaderArea, HeaderTitle, PageBody, LoadingIcon, ListArea, BackButton, FilterFull, OrganizationFilter } from './styles';
import { RefreshControl, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import BackIcon from '../../images/back.svg';
import FilterIcon from '../../images/filter.svg';

import Api from '../../Api';
import WorkerItem from '../../components/WorkerItem';
import Filter from '../../components/Filter';

export default () => {

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [animals, setAnimals] = useState({"animals": [{"id": 0, "value": "Canino"}, {"id": 1, "value": "Felino"}, {"id": 2, "value": "Pássaro"}, {"id": 3, "value": "Roedor"}]});

    const navigation = useNavigation();

    const getWorkers = async () => {
        setList([]);

        let tipoServico = await AsyncStorage.getItem('tipoServico');
        let tipoAnimal = await AsyncStorage.getItem('tipoAnimal');
        let tipoUsuario = await AsyncStorage.getItem('tipoUsuario');
        let email = await AsyncStorage.getItem('email');

        let route = `?servico=${tipoServico}`;

        if (tipoAnimal != null)
            route += `&tiposPet=${tipoAnimal}`;

        if (tipoUsuario == 2)
            route += `&email=${email}`;

        let res = await Api.getServicesById(route);

        res == null ? setList([]) : setList(res); 
    }

    useEffect(() => {
        getWorkers();
    }, []);

    const onRefresh = () => {
        setRefreshing(true); 
    }

    const handleGoBackButton = async () => {
        await AsyncStorage.removeItem('tipoAnimal');

        navigation.goBack();
    }

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <HeaderArea>
                    <BackButton onPress={handleGoBackButton}>
                        <BackIcon width="40" height="40" fill="#1C263F" />
                    </BackButton>
                    <HeaderTitle>HAPPY PET</HeaderTitle>
                </HeaderArea>

                <PageBody>
                    <OrganizationFilter>
                        <FlatList
                            horizontal
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            legacyImplementation={false}
                            data={animals.animals}
                            keyExtractor={(item) => item.id}
                            renderItem={ ({item}) => <Filter data={item} funcRefresh={getWorkers}/>}
                        />
                    </OrganizationFilter>

                    {loading &&
                        <LoadingIcon 
                            size='large'
                            color='#20283D'
                        />
                    }

                    <ListArea>
                        {list.map((item, k) => (
                            <WorkerItem key={k} data={item} funcRefresh={getWorkers}/>
                        ))}
                    </ListArea>
                    
                </PageBody>
            </Scroller>
        </Container>
    );
}