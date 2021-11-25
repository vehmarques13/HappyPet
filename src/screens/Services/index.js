import React, { useState, useEffect } from 'react';
import { Container, Scroller, HeaderArea, HeaderTitle, Name, PageBody, LoadingIcon, ListArea, BackButton, FilterFull, OrganizationFilter } from './styles';
import { RefreshControl, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import BackIcon from '../../images/back.svg';

import Api from '../../Api';
import WorkerItem from '../../components/WorkerItem';
import Filter from '../../components/Filter';

import FilterIcon from '../../images/filter.svg';

export default () => {

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [animals, setAnimals] = useState({"animals": [{"id": 0, "value": "Canino"}, {"id": 1, "value": "Felino"}, {"id": 2, "value": "Pássaro"}, {"id": 3, "value": "Roedor"}]});
    const [name, setName] = useState("");

    const navigation = useNavigation();

    const getWorkers = async () => {
        setList([]);
        setLoading(true);

        let tipoServico = await AsyncStorage.getItem('tipoServico');
        let tipoAnimal = await AsyncStorage.getItem('tipoAnimal');
        let tipoUsuario = await AsyncStorage.getItem('tipoUsuario');
        let email = await AsyncStorage.getItem('email');
        let rotaFiltro = await AsyncStorage.getItem('rotaFiltro');

        let route = `?servico=${tipoServico}`;

        if (tipoAnimal != null)
            route += `&tiposPet=${tipoAnimal}`;

        if (tipoUsuario == 2)
            route += `&email=${email}`;
        else 
            route += `&emailLogged=${email}`;

        if (rotaFiltro != null) 
            route += rotaFiltro;

        console.log(rotaFiltro);
        console.log(route);

        let res = await Api.getServicesById(route);

        res == null ? setList([]) : setList(res); 

        setLoading(false);
    }

    useEffect(() => {
        getWorkers();
        pegarNome();
    }, []);

    const onRefresh = () => {
        setRefreshing(true); 
    }

    const handleGoBackButton = async () => {
        await AsyncStorage.removeItem('tipoAnimal');
        await AsyncStorage.removeItem('rotaFiltro');

        navigation.reset({
            routes:[{name: 'MainTab'}]
        });
    }

    const handleFilterClick = async () => {
        navigation.reset({
            routes:[{name: 'FilterGeral'}]
        });
    }

    const pegarNome = async () => {
        setName(await AsyncStorage.getItem('nome'));
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
                    <Name>Olá, {name.substring(0, name.indexOf(' ') == -1 ? name.length : name.indexOf(' '))}!</Name>
                </HeaderArea>

                <PageBody>
                    <OrganizationFilter>
                        <FilterFull onPress={handleFilterClick}>
                            <FilterIcon width="26" height="26" fill="#858585"/>
                        </FilterFull>

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