import React, { useState, useEffect } from 'react';
import { Container, Scroller, HeaderArea, HeaderTitle, Name, SwipeDot, SwipeDotActive, SwipeItem, SwipeImage, PageBody, UserInfoArea, UserInfo, Avatar, UserInfoName, UserInfoState, UserServices, UserButton, LoadingIcon, ServiceArea, ServiceTitle, ServiceDescription, Line, BackButton, FilterPet, FilterText, OrganizationArea } from './styles';
import { useNavigation } from '@react-navigation/native';
import Api from '../../Api';
import Swiper from 'react-native-swiper';
import { ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import BackIcon from '../../images/back.svg';
import DeleteIcon from '../../images/delete.svg';
import DogIcon from '../../images/dog.svg';
import CatIcon from '../../images/cat.svg';
import BirdIcon from '../../images/bird.svg';
import HamsterIcon from '../../images/hamster.svg';
import FemaleIcon from '../../images/female.svg';
import MaleIcon from '../../images/male.svg';

export default ({route}) => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [name, setName] = useState("");

    let pet = route.params?.pet;

    const getPet = async () => {
        let emailLogado = await AsyncStorage.getItem('email');

        setLoading(true);

        setList([]);

        let res = await Api.getPetByEmailId(emailLogado, pet.id);

        setList(res);

        setLoading(false);
    }

    useEffect(() => {
        getPet();
        tipoPet();
        nomeTipoPet();
        pegarNome();
    }, []);

    const tipoPet = () => {
        switch(list.tipoPet) {
            case 0:
                return <HamsterIcon width={22} height={22} fill="#394a73" />;
            case 2:
                return <BirdIcon width={22} height={22} fill="#394a73" />;
            case 3:
                return <CatIcon width={22} height={22} fill="#394a73" />;
            case 4:
                return <DogIcon width={22} height={22} fill="#394a73" />;
            default:
                return "Outros";
        }
    }

    const nomeTipoPet = () => {
        switch(list.tipoPet) {
            case 0:
                return "Roedor";
            case 2:
                return "Pássaro";
            case 3:
                return "Felino";
            case 4:
                return "Canino";
            default:
                return "Outros";
        }
    }

    const deletePet = async (id) => {
        let email = await AsyncStorage.getItem('email');
        let res = await Api.deletePets(email, id);

        navigation.reset({
            routes: [{name: 'MainTab'}]
        });
    }

    const handleBackClick = () => {
        navigation.goBack();
    }

    const pegarNome = async () => {
        setName(await AsyncStorage.getItem('nome'));
    }

    return (
        <Container>
            <Scroller>
                <HeaderArea>
                    <BackButton onPress={handleBackClick}>
                        <BackIcon width="40" height="40" fill="#1C263F" />
                    </BackButton>
                    <HeaderTitle>HAPPY PET</HeaderTitle>
                    <Name>Olá, {name.substring(0, name.indexOf(' ') == -1 ? name.length : name.indexOf(' '))}!</Name>
                </HeaderArea>

                <ImageBackground
                    source={require('../../images/fundo4.png')}
                    resizeMode="cover"
                    style={{ width: '100%', height: 150, justifyContent: 'center', alignItems: 'center' }}
                />

                <PageBody>
                    <UserInfoArea>
                        {list.sexo == "macho" ?
                            <Avatar source={require('../../images/avatarPetMacho2.png')} />
                        : <Avatar source={require('../../images/avatarPetFemea2.png')} />
                        }
                        <UserInfo>
                            {loading &&
                                <LoadingIcon 
                                    size='large'
                                    color='#20283D'
                                />
                            }
                            
                            <OrganizationArea>
                                <UserInfoName>{list.nome}</UserInfoName>
                                {list.sexo == "femea" ? 
                                    <FemaleIcon width="19" height="19" fill="#1C263F"/> 
                                : <MaleIcon width="19" height="19" fill="#1C263F"/> 
                                }
                            </OrganizationArea>
                            <UserInfoState>{list.raca}</UserInfoState>
                            <FilterPet>
                                <UserServices>{tipoPet()}</UserServices>
                                <FilterText>{nomeTipoPet()}</FilterText>
                            </FilterPet>
                        </UserInfo>

                        <UserButton onPress={()=> { deletePet(list.id) }}>
                            <DeleteIcon width="20" height="20" fill="#00B1E1" />
                        </UserButton>
                    </UserInfoArea>

                    <ServiceArea style={{marginTop: 20}}>
                        <ServiceTitle>Porte</ServiceTitle>
                        <ServiceDescription>{list.porte}.</ServiceDescription>

                        <Line />

                        <ServiceTitle>Descrição</ServiceTitle>
                        <ServiceDescription>{list.descricao}</ServiceDescription>

                        <Line />

                        <ServiceTitle>Imagens</ServiceTitle>

                        <Swiper
                            style={{height: 200}}
                            dot={<SwipeDot />}
                            activeDot={<SwipeDotActive />}
                            paginationStyle={{top: 15, right: 15, bottom: null, left: null}}
                            autoplay={true}
                        >
                            <SwipeItem>
                                <SwipeImage source={require('../../images/fundo.png')} resizeMode="cover" />
                            </SwipeItem>

                            <SwipeItem>
                                <SwipeImage source={require('../../images/fundo.png')} resizeMode="cover" />
                            </SwipeItem>
                        </Swiper>
                    </ServiceArea>
                </PageBody>
            </Scroller>
        </Container>
    );
}
