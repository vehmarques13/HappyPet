import React, { useState, useEffect } from 'react';
import { Container, Scroller, HeaderArea, HeaderTitle, Background, SwipeDot, SwipeDotActive, SwipeItem, SwipeImage, PageBody, UserInfoArea, UserInfo, Avatar, UserInfoName, UserInfoState, UserButton, LoadingIcon, ServiceArea, ServiceTitle, ServiceDescription, Line, BackButton, AnimalsArea } from './styles';
import { useNavigation } from '@react-navigation/native';
import Api from '../../Api';
import Swiper from 'react-native-swiper';

import Stars from '../../components/Stars';
import Animals from '../../components/Animals';

import FavoriteIcon from '../../images/favorite.svg';
import ChatIcon from '../../images/chat.svg';
import BackIcon from '../../images/back.svg';

export default ({route}) => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [filtro, setFiltro] = useState([]);

    let id = route.params?.id;
    let email = route.params?.email;

    const getServiceInfo = async () => {
        setList([]);
        setFiltro([]);

        let res = await Api.getServiceById(email, id);

        if (res != undefined) {
            setList(res);
            setFiltro(res.filtro);
        }
    }

    const handleClick = () => {
        navigation.navigate('AccountId', { email: email });
    }

    useEffect(() => {
        getServiceInfo();
    }, []);

    return (
        <Container>
            <Scroller>
                <HeaderArea>
                    <BackButton onPress={() => navigation.goBack()}>
                        <BackIcon width="40" height="40" fill="#1C263F" />
                    </BackButton>
                    <HeaderTitle>HAPPY PET</HeaderTitle>
                </HeaderArea>

                <Background source={require('../../images/fundo.png')} resizeMode="cover" />

                <PageBody>
                    <UserInfoArea onPress={handleClick}>
                        {list.genero == "Masculino" ?
                            <Avatar source={require('../../images/avatar.jpg')} />
                        : <Avatar source={require('../../images/avatarMulher.jpg')} />
                        }
                        <UserInfo>
                            <UserInfoName>{list.nome}</UserInfoName>
                            <UserInfoState>{list.cidade}, {list.estado}</UserInfoState>
                            <Stars stars={list.avaliacao} size={20} />
                        </UserInfo>
                        <UserButton>
                            <ChatIcon width="20" height="20" fill="#00B1E1" />
                        </UserButton>

                        <UserButton>
                            <FavoriteIcon width="22" height="22" fill="#00B1E1" />
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