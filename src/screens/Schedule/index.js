import React, { useState, useEffect } from 'react';
import { Container, Scroller, HeaderArea, HeaderTitle, PageBody, LoadingIcon, ListArea, BackButton } from './styles';
import { RefreshControl, FlatList } from 'react-native';

import Api from '../../Api';
import { Alert } from 'react-native';
import ScheduleItem from '../../components/ScheduleItem';

import BackIcon from '../../images/back.svg';

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

    const handleGoBackButton = () => {
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
                    {loading &&
                        <LoadingIcon 
                            size='large'
                            color='#20283D'
                        />
                    }

                    <ListArea>
                        {/* {list.map((item) => (
                            <WorkerItem key={i} data={item} />
                        ))}; */}
                        <FlatList 
                            horizontal
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            legacyImplementation={false}
                            data={this.state.feed}
                            keyExtractor={(item) => item.id}
                            renderItem={ ({item}) => <ScheduleItem data={item}/>}
                        />
                    </ListArea>
                </PageBody>
            </Scroller>
        </Container>
    );
}