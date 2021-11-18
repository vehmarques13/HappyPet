import React, { useState, useEffect } from 'react';
import { Container, Scroller, HeaderArea, HeaderTitle, PageBody, LoadingIcon, ListArea, BackButton, FilterFull, OrganizationFilter } from './styles';
import { RefreshControl, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import BackIcon from '../../images/back.svg';
import FilterIcon from '../../images/filter.svg';

import Api from '../../Api';
import FavoriteWorkerItem from '../../components/FavoriteWorkerItem';
import Filter from '../../components/Filter';

export default () => {

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [animals, setAnimals] = useState({"animals": [{"id": 0, "value": "Canino"}, {"id": 1, "value": "Felino"}, {"id": 2, "value": "Pássaro"}, {"id": 3, "value": "Roedor"}]});

    const getFavorites = async () => {
        setList([]);
        setLoading(true);

        let tipoAnimal = await AsyncStorage.getItem('tipoAnimal');
        let email = await AsyncStorage.getItem('email');

        let route = `?emailLogged=${email}`;

        if (tipoAnimal != null) {
            route += `&tiposPet=${tipoAnimal}`;
        }

        if (route == `?emailLogged=${email}`) 
            route = `/${email}/favoritos`;

        let res = await Api.getFavorites(route);
        res == null ? setList([]) : setList(res.filter(f => f.isFavorito == true));

        setLoading(false);
    }

    useEffect(() => {
        getFavorites();
    }, []);

    const onRefresh = () => {
        setRefreshing(true); 
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

                    <OrganizationFilter>
                        <FlatList
                            horizontal
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            legacyImplementation={false}
                            data={animals.animals}
                            keyExtractor={(item) => item.id}
                            renderItem={ ({item}) => <Filter data={item} funcRefresh={getFavorites}/>}
                        />
                    </OrganizationFilter>

                    <ListArea>
                        {list.map((item, k) => (
                            <FavoriteWorkerItem key={k} data={item} funcRefresh={getFavorites}/>
                        ))}
                    </ListArea>
                    
                </PageBody>
            </Scroller>
        </Container>
    );
}