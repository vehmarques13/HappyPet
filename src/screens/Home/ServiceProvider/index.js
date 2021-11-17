import React, { useState, useEffect } from 'react';
import { Container, Scroller, HeaderArea, HeaderTitle, PageBody, LoadingIcon, ServiceArea, ServiceTitle, Services, ServicesArea, ServicesAreaEnable, ServicesView, ServiceImage, ServiceName, OrganizationArea, ButtonArea } from './styles';
import { RefreshControl, FlatList, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import AddIcon from '../../../images/add2.svg';

import Api from '../../../Api';
import { Alert } from 'react-native';
import ScheduleItem from '../../../components/ScheduleItem';

export default () => {

    const [loading, setLoading] = useState(false);
    const [listSchedule, setListSchedule] = useState([]);
    const [listServices, setListServices] = useState([]);
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

    const getServicesType = async () => {
        await AsyncStorage.removeItem('tipoAnimal');
        
        setLoading(true);
        setListServices([]);

        let email = await AsyncStorage.getItem('email');
        let res = await Api.getServicesType(email);

        if (res.error == undefined) 
            setListServices(res);
        else 
            Alert('Erro: ' + res.error);

        setLoading(false);
    }

    useEffect(() => {
        getScheduleToday();
        getServicesType();
    }, []);

    const onRefresh = () => {
        setRefreshing(true); 
    }

    const handleClick = () => {
        navigation.reset({
            routes: [{name: 'AddService'}]
        });
    }
    
    function tipoServico(n) {
        return listServices.find(x => x == n) == n;
    }

    const handleServiceClick = async (id) => {
        await AsyncStorage.setItem('tipoServico', id.toString());
        navigation.navigate('Services');
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

                    <ServiceArea>
                        <ServiceTitle>Agenda</ServiceTitle>
                        {listSchedule.length != 0 ? 
                            <FlatList 
                                style={{marginTop: 10}}
                                horizontal
                                pagingEnabled={true}
                                showsHorizontalScrollIndicator={false}
                                legacyImplementation={false}
                                data={listSchedule}
                                keyExtractor={(item) => item.id}
                                renderItem={ ({item}) => <ScheduleItem data={item} funcRefresh={getScheduleToday} />}
                            /> 
                        : <Text>Não há serviços agendados para hoje.</Text>
                        }
                    </ServiceArea>

                    <ServiceArea>
                        <OrganizationArea>
                            <ServiceTitle>Serviços</ServiceTitle>
                            <ButtonArea onPress={handleClick}>
                                <AddIcon width="28" height="28" fill="#00B1E1" />
                            </ButtonArea>
                        </OrganizationArea>
                        <Services>
                            {tipoServico(0) ?
                                <ServicesArea onPress={() => handleServiceClick(0)}>
                                    <ServicesView>
                                        <ServiceImage source={require('../../../images/veterinario.jpg')}/>
                                        <ServiceName>Veterinário</ServiceName>
                                    </ServicesView>
                                </ServicesArea>
                            : <ServicesAreaEnable>
                                <ServicesView style={{tintColor: 'gray', opacity: 0.6}}> 
                                    <ServiceImage source={require('../../../images/veterinario.jpg')}/>
                                    <ServiceName>Veterinário</ServiceName>
                                </ServicesView>
                              </ServicesAreaEnable>
                            }
                            {tipoServico(1) ?
                                <ServicesArea onPress={() => handleServiceClick(1)}>
                                    <ServicesView>
                                        <ServiceImage source={require('../../../images/banho.jpg')}/>
                                        <ServiceName>Banho e Tosa</ServiceName>
                                    </ServicesView>
                                </ServicesArea>
                            : <ServicesAreaEnable>
                                <ServicesView style={{tintColor: 'gray', opacity: 0.6}}> 
                                    <ServiceImage source={require('../../../images/banho.jpg')}/>
                                    <ServiceName>Banho e Tosa</ServiceName>
                                </ServicesView>
                              </ServicesAreaEnable>
                            }
                            {tipoServico(2) ?
                                <ServicesArea onPress={() => handleServiceClick(2)}>
                                    <ServicesView>
                                        <ServiceImage source={require('../../../images/passeio.jpg')}/>
                                        <ServiceName>Passeio</ServiceName>
                                    </ServicesView>
                                </ServicesArea>
                            : <ServicesAreaEnable>
                                <ServicesView style={{tintColor: 'gray', opacity: 0.6}}> 
                                    <ServiceImage source={require('../../../images/passeio.jpg')}/>
                                    <ServiceName>Passeio</ServiceName>
                                </ServicesView>
                              </ServicesAreaEnable>
                            }
                            {tipoServico(3) ?
                                <ServicesArea onPress={() => handleServiceClick(3)}>
                                    <ServicesView>
                                        <ServiceImage source={require('../../../images/adestramento.jpg')}/>
                                        <ServiceName>Adestramento</ServiceName>
                                    </ServicesView>
                                </ServicesArea>
                            : <ServicesAreaEnable>
                                <ServicesView style={{tintColor: 'gray', opacity: 0.6}}> 
                                    <ServiceImage source={require('../../../images/adestramento.jpg')}/>
                                    <ServiceName>Adestramento</ServiceName>
                                </ServicesView>
                              </ServicesAreaEnable>
                            }
                            {tipoServico(4) ?
                                <ServicesArea onPress={() => handleServiceClick(4)}>
                                    <ServicesView>
                                        <ServiceImage source={require('../../../images/petsitter.jpg')}/>
                                        <ServiceName>Pet Sitter</ServiceName>
                                    </ServicesView>
                                </ServicesArea>
                            : <ServicesAreaEnable>
                                <ServicesView style={{tintColor: 'gray', opacity: 0.6}}> 
                                    <ServiceImage source={require('../../../images/petsitter.jpg')}/>
                                    <ServiceName>Pet Sitter</ServiceName>
                                </ServicesView>
                              </ServicesAreaEnable>
                            }
                            {tipoServico(5) ?
                                <ServicesArea onPress={() => handleServiceClick(5)}>
                                    <ServicesView>
                                        <ServiceImage source={require('../../../images/hospedagem.jpg')}/>
                                        <ServiceName>Hospedagem</ServiceName>
                                    </ServicesView>
                                </ServicesArea>
                            : <ServicesAreaEnable>
                                <ServicesView style={{tintColor: 'gray', opacity: 0.6}}> 
                                    <ServiceImage source={require('../../../images/hospedagem.jpg')}/>
                                    <ServiceName>Hospedagem</ServiceName>
                                </ServicesView>
                              </ServicesAreaEnable>
                            }
                        </Services>
                    </ServiceArea>
                </PageBody>
            </Scroller>
        </Container>
    );
}