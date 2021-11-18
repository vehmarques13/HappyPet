import React, { useState, useEffect } from 'react';
import { Container, Scroller, HeaderArea, HeaderTitle, Background, SwipeDot, SwipeDotActive, SwipeItem, SwipeImage, PageBody, UserInfoArea, UserInfo, Avatar, UserInfoName, UserInfoState, UserButton, LoadingIcon, ServiceArea, ServiceTitle, ServiceDescription, Line, BackButton, AnimalsArea, FavoriteArea, FavoriteView } from './styles';
import { useNavigation } from '@react-navigation/native';
import Api from '../../Api';
import Swiper from 'react-native-swiper';
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Stars from '../../components/Stars';
import Animals from '../../components/Animals';

import ChatIcon from '../../images/chat.svg';
import BackIcon from '../../images/back.svg';
import FavoritesFull from '../../images/favorite_full.svg';
import FavoritesEmpty from '../../images/favorite.svg';

export default ({route}) => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [filtro, setFiltro] = useState([]);

    let id = route.params?.id;
    let email = route.params?.email;

    const getServiceInfo = async () => {
        let emailLogado = await AsyncStorage.getItem('email');

        setLoading(true);

        setList([]);
        setFiltro([]);

        let res = await Api.getServiceById(email, id, emailLogado);

        if (res != undefined) {
            setList(res);
            setFiltro(res.filtro);
        }

        setLoading(false);
    }

    const handleClick = () => {
        navigation.navigate('AccountId', { email: email });
    }

    const handleBackClick = () => {
        navigation.goBack();
    }

    const IconFavorites = async (id, email, status) => {
        let emailLogado = await AsyncStorage.getItem('email');

        let res = await Api.Favorites(emailLogado, id, email, status);
        getServiceInfo();
    }

    useEffect(() => {
        getServiceInfo();
    }, []);

    return (
        <Container>
            <Scroller>
                <HeaderArea>
                    <BackButton onPress={handleBackClick}>
                        <BackIcon width="40" height="40" fill="#1C263F" />
                    </BackButton>
                    <HeaderTitle>HAPPY PET</HeaderTitle>
                </HeaderArea>

                <Background source={require('../../images/fundo.png')} resizeMode="cover" />

                <PageBody>
                    <UserInfoArea>
                        {list.genero == "Masculino" ?
                            <Avatar source={require('../../images/avatar.jpg')} />
                        : <Avatar source={require('../../images/avatarMulher.jpg')} />
                        }
                        <UserInfo onPress={handleClick}>
                            {loading &&
                                <LoadingIcon 
                                    size='large'
                                    color='#20283D'
                                />
                            }
                            
                            <UserInfoName>{list.nome}</UserInfoName>
                            <UserInfoState>{list.cidade}, {list.estado}</UserInfoState>
                            <Stars stars={list.avaliacao} size={20} />
                        </UserInfo>
                        <UserButton onPress={()=> { Linking.openURL(list.telefone) }}>
                            <ChatIcon width="20" height="20" fill="#00B1E1" />
                        </UserButton>

                        <UserButton onPress={() => IconFavorites(list.id, list.email, list.isFavorito)}>
                            <FavoriteArea>
                                <FavoriteView>
                                    {list.isFavorito == false && <FavoritesEmpty width="23" height="23" fill="#00B1E1" />}
                                    {list.isFavorito == true && <FavoritesFull width="23" height="23" fill="#00B1E1" />}
                                </FavoriteView>
                            </FavoriteArea>
                        </UserButton>
                    </UserInfoArea>

                    <ServiceArea>
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

                        <Line />

                        <ServiceTitle>Descrição</ServiceTitle>
                        <ServiceDescription>{list.descricao}</ServiceDescription>

                        <Line />

                        <ServiceTitle>Preço médio</ServiceTitle>
                        <ServiceDescription>{list.precoMedio}.</ServiceDescription>

                        <Line />

                        <ServiceTitle>Animais aceitos</ServiceTitle>
                        {filtro.tiposPet == undefined ? 
                            <ServiceDescription>Não aceita nenhum animal.</ServiceDescription>  
                        :
                            <AnimalsArea>
                                {filtro.tiposPet.map((item, k) => (
                                    <Animals key={k} animals={item} size={22} />
                                ))}
                            </AnimalsArea>
                        }

                        <Line />

                        <ServiceTitle>Portes aceitos</ServiceTitle>
                        {filtro.pesos == undefined ? 
                            <ServiceDescription>Não aceita nenhum porte.</ServiceDescription>  
                        :
                            <AnimalsArea>
                                {filtro.pesos.map((item, k) => (
                                    <ServiceDescription>{item}; </ServiceDescription>
                                ))}
                            </AnimalsArea>
                        }

                        <Line />

                        <ServiceTitle>Medicação oral</ServiceTitle>
                        <ServiceDescription>{filtro.medicacaoOral == true ? "Sim" : "Não"}</ServiceDescription>

                        <Line />

                        <ServiceTitle>Medicação injetável</ServiceTitle>
                        {filtro.medicacaoInjetavel == undefined ? 
                            <ServiceDescription></ServiceDescription> 
                        :
                            <ServiceDescription>{filtro.medicacaoInjetavel == true ? "Sim" : "Não"}</ServiceDescription>
                        }

                        <Line />

                        <ServiceTitle>Curativo</ServiceTitle>
                        {filtro.curativo == undefined ? 
                            <ServiceDescription></ServiceDescription> 
                        :
                            <ServiceDescription>{filtro.curativo == true ? "Sim" : "Não"}</ServiceDescription>
                        }

                    </ServiceArea>
                </PageBody>
            </Scroller>
        </Container>
    );
}