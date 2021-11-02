import React, { useState, useEffect } from 'react';
import { Container, Scroller, HeaderArea, HeaderTitle, PageBody, SearchArea, SearchInput, SearchButton, LoadingIcon, ServiceArea, ServiceTitle, Services, ServicesArea, ServicesView, ServiceImage, ServiceName } from './styles';
import { RefreshControl, FlatList, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import SearchIcon from '../../../images/search.svg';
import AddIcon from '../../../images/add2.svg';

import Api from '../../../Api';
import { Alert } from 'react-native';
import ScheduleItem from '../../../components/ScheduleItem';

export default () => {

    const [loading, setLoading] = useState(false);
    const [listSchedule, setListSchedule] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();

    const getScheduleToday = async () => {
        setLoading(true);
        setListSchedule([]);

        let email = await AsyncStorage.getItem('email');
        let res = await Api.getScheduleToday(email);

        if (res.error == undefined) 
            setListSchedule(res);
        else 
            Alert('Erro: ' + res.error);

        setLoading(false);
    }

    useEffect(() => {
        getScheduleToday();
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
                    {/* <SearchArea> 
                        <SearchInput 
                            placeholder="Faça sua busca..."
                            value={searchText}
                            onChangeText={o => setSearchText(o)}
                        />
                        <SearchButton onPress={getWorkers}>
                            <SearchIcon width="24" height="24" fill="#6B6B6B" />
                        </SearchButton>
                    </SearchArea> */}

                    <ServiceArea>
                        <ServiceTitle>Agenda</ServiceTitle>
                        {listSchedule.length != 0 ? 
                            <FlatList 
                                style={{marginTop: -8}}
                                horizontal
                                pagingEnabled={true}
                                showsHorizontalScrollIndicator={false}
                                legacyImplementation={false}
                                data={listSchedule}
                                keyExtractor={(item) => item.id}
                                renderItem={ ({item}) => <ScheduleItem data={item}/>}
                            /> 
                        : <Text>Não há serviços agendados para hoje.</Text>
                        }
                    </ServiceArea>

                    <ServiceArea>
                        <ServiceTitle>Serviços</ServiceTitle>
                        <Services>
                            <ServicesArea>
                                <ServicesView>
                                    <ServiceImage source={require('../../../images/veterinario.jpg')}/>
                                    <ServiceName>Veterinário</ServiceName>
                                </ServicesView>
                            </ServicesArea>

                            <ServicesArea>
                                <ServicesView>
                                    <ServiceImage source={require('../../../images/banho.jpg')}/>
                                    <ServiceName>Banho e Tosa</ServiceName>
                                </ServicesView>
                            </ServicesArea>

                            <ServicesArea>
                                <ServicesView>
                                    <ServiceImage source={require('../../../images/passeio.jpg')}/>
                                    <ServiceName>Passeio</ServiceName>
                                </ServicesView>
                            </ServicesArea>

                            <ServicesArea>
                                <ServicesView>
                                    <ServiceImage source={require('../../../images/adestramento.jpg')}/>
                                    <ServiceName>Adestramento</ServiceName>
                                </ServicesView>
                            </ServicesArea>

                            <ServicesArea>
                                <ServicesView>
                                    <ServiceImage source={require('../../../images/petsitter.jpg')}/>
                                    <ServiceName>Pet Sitter</ServiceName>
                                </ServicesView>
                            </ServicesArea>

                            <ServicesArea>
                                <ServicesView>
                                    <ServiceImage source={require('../../../images/hospedagem.jpg')}/>
                                    <ServiceName>Hospedagem</ServiceName>
                                </ServicesView>
                            </ServicesArea>
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