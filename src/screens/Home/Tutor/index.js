import React, { useState, useEffect } from 'react';
import { Container, Scroller, HeaderArea, HeaderTitle, PageBody, LoadingIcon, ServiceArea, ServiceTitle, Services, ServicesArea, ServicesView, ServiceImage, ServiceName, PetTitle, OrganizationArea, ButtonArea } from './styles';
import { RefreshControl, FlatList, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import AddIcon from '../../../images/add2.svg';

import Api from '../../../Api';
import { Alert } from 'react-native';
import Pets from '../../../components/Pets';

export default () => {

    const [loading, setLoading] = useState(false);
    const [listPets, setListPets] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();

    const getPets = async () => {
        await AsyncStorage.removeItem('tipoAnimal');
        
        setLoading(true);
        setListPets([]);

        let email = await AsyncStorage.getItem('email');
        let res = await Api.getPetByEmail(email);

        if (res.error == undefined) 
            setListPets(res);
        else 
            Alert('Erro: ' + res.error);

        setLoading(false);
    }

    useEffect(() => {
        getPets();
    }, []);

    const onRefresh = () => {
        setRefreshing(true); 
    }

    const handleClick = () => {
        navigation.reset({
            routes: [{name: 'AddPet'}]
        });
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
                    <ServiceArea>
                        <OrganizationArea>
                            <PetTitle>Pets</PetTitle>
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

                        {listPets.length != 0 ? 
                            <FlatList 
                                style={{marginTop: -8}}
                                horizontal
                                pagingEnabled={true}
                                showsHorizontalScrollIndicator={false}
                                legacyImplementation={false}
                                data={listPets}
                                keyExtractor={(item) => item.id}
                                renderItem={ ({item}) => <Pets data={item} funcRefresh={getPets}/>}
                            /> 
                        : <Text>Não há pets cadastrados.</Text>
                        }
                    </ServiceArea>

                    <ServiceArea>
                        <ServiceTitle>Serviços</ServiceTitle>
                        <Services>
                            <ServicesArea onPress={() => handleServiceClick(0)}>
                                <ServicesView>
                                    <ServiceImage source={require('../../../images/veterinario.jpg')}/>
                                    <ServiceName>Veterinário</ServiceName>
                                </ServicesView>
                            </ServicesArea>

                            <ServicesArea onPress={() => handleServiceClick(1)}>
                                <ServicesView>
                                    <ServiceImage source={require('../../../images/banho.jpg')}/>
                                    <ServiceName>Banho e Tosa</ServiceName>
                                </ServicesView>
                            </ServicesArea>

                            <ServicesArea onPress={() => handleServiceClick(2)}>
                                <ServicesView>
                                    <ServiceImage source={require('../../../images/passeio.jpg')}/>
                                    <ServiceName>Passeio</ServiceName>
                                </ServicesView>
                            </ServicesArea>

                            <ServicesArea onPress={() => handleServiceClick(3)}>
                                <ServicesView>
                                    <ServiceImage source={require('../../../images/adestramento.jpg')}/>
                                    <ServiceName>Adestramento</ServiceName>
                                </ServicesView>
                            </ServicesArea>

                            <ServicesArea onPress={() => handleServiceClick(4)}>
                                <ServicesView>
                                    <ServiceImage source={require('../../../images/petsitter.jpg')}/>
                                    <ServiceName>Pet Sitter</ServiceName>
                                </ServicesView>
                            </ServicesArea>

                            <ServicesArea onPress={() => handleServiceClick(5)}>
                                <ServicesView>
                                    <ServiceImage source={require('../../../images/hospedagem.jpg')}/>
                                    <ServiceName>Hospedagem</ServiceName>
                                </ServicesView>
                            </ServicesArea>
                        </Services>
                    </ServiceArea>
                </PageBody>
            </Scroller>
        </Container>
    );
}