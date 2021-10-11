import React, { useState, useEffect } from 'react';
import { Container, Scroller, HeaderArea, HeaderTitle, PageBody, SearchArea, SearchInput, SearchButton, LoadingIcon, ServiceArea, ServiceTitle, OrganizationArea, ButtonArea, Services } from './styles';
import { RefreshControl, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import SearchIcon from '../../../images/search.svg';
import AddIcon from '../../../images/add2.svg';

import Api from '../../../Api';
import { Alert } from 'react-native';
import Pets from '../../../components/Pets';
import ServiceItem from '../../../components/ServiceItem';

export default () => {

    this.state = {
        feed:[
          {id: 1, nome: 'Joseffe', idade: 32, email: 'joseffe@gmail.com'},
          {id: 2, nome: 'João', idade: 17, email: 'joao@gmail.com'},
          {id: 3, nome: 'Maria', idade: 22, email: 'maria@gmail.com'},
          {id: 4, nome: 'Joaquim', idade: 42, email: 'joaquim@gmail.com'},
          {id: 5, nome: 'Paulo', idade: 36, email: 'paulo@gmail.com'},
        ]
    } 

    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();

    const getWorkers = async () => {
        setLoading(true);
        setList([]);

        let res = await Api.getWorkers();
        
        if (res.error == '') {
            setList(res.data);
        } else {
            Alert('Erro: ' + res.error);
        }

        setLoading(false);
    }

    useEffect(() => {
        getWorkers();
    }, []);

    const onRefresh = () => {
        setRefreshing(true); 
    }

    const handleClick = () => {
        navigation.navigate('AddPet');
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
                    <SearchArea> 
                        <SearchInput 
                            placeholder="Faça sua busca..."
                            value={searchText}
                            onChangeText={o => setSearchText(o)}
                        />
                        <SearchButton onPress={getWorkers}>
                            <SearchIcon width="24" height="24" fill="#6B6B6B" />
                        </SearchButton>
                    </SearchArea>

                    <ServiceArea>
                        <OrganizationArea>
                            <ServiceTitle>Pets</ServiceTitle>
                            <ButtonArea onPress={handleClick}>
                                <AddIcon width="28" height="28" fill="#00B1E1" />
                            </ButtonArea>
                        </OrganizationArea>
                        <FlatList 
                            horizontal
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            legacyImplementation={false}
                            data={this.state.feed}
                            keyExtractor={(item) => item.id}
                            renderItem={ ({item}) => <Pets data={item}/>}
                        />
                    </ServiceArea>

                    <ServiceArea>
                        <ServiceTitle>Serviços</ServiceTitle>
                        <Services>
                            <ServiceItem />
                            <ServiceItem />
                            <ServiceItem />
                            <ServiceItem />
                            <ServiceItem />
                            <ServiceItem />
                        </Services>
                    </ServiceArea>

                    {loading &&
                        <LoadingIcon 
                            size='large'
                            color='#20283D'
                        />
                    }
                </PageBody>
            </Scroller>
        </Container>
    );
}