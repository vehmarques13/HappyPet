import React, { useState, useEffect } from 'react';
import { Container, Scroller, HeaderArea, HeaderTitle, Background, SwipeDot, SwipeDotActive, SwipeItem, SwipeImage, PageBody, UserInfoArea, UserInfo, Avatar, UserInfoName, UserInfoState, UserButton, LoadingIcon, ServiceArea, ServiceTitle, ServiceDescription, Line, BackButton } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import Api from '../../Api';
import Swiper from 'react-native-swiper';

import Stars from '../../components/Stars';
import Animals from '../../components/Animals';

import FavoriteIcon from '../../images/favorite.svg';
import ChatIcon from '../../images/chat.svg';
import BackIcon from '../../images/back.svg';

export default () => {
    const navigation = useNavigation();
    // const route = useRoute();

    // const [userInfo, setUserInfo] = useState({
    //     id: route.params.id,
    //     avatar: route.params.avatar,
    //     name: route.params.name,
    //     stars: route.params.stars
    // });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getWorkerInfo = async () => {
            setLoading(true);

            let json = await Api.getWorker(userInfo.id);

            if (json.error != '')
                alert(json.error);
            else 
                setUserInfo(json.data);

            setLoading(false);
        }
        getWorkerInfo();
    }, []);

    const handleBackButton = () => {
        navigation.goBack();
    }

    const handleGoBackButton = () => {
        navigation.goBack();
    }

    return (
        <Container>
            {/* <Text>{userInfo.name}</Text> */}
            <Scroller>
                <HeaderArea>
                    <BackButton onPress={handleGoBackButton}>
                        <BackIcon width="40" height="40" fill="#1C263F" />
                    </BackButton>
                    <HeaderTitle>HAPPY PET</HeaderTitle>
                </HeaderArea>

                <Background source={require('../../images/fundo.png')} resizeMode="cover" />

                <PageBody>
                    <UserInfoArea>
                        <Avatar source={require('../../images/avatar.jpg')} />
                        <UserInfo>
                            <UserInfoName>Bruno Sampaio de Morais</UserInfoName>
                            <UserInfoState>São Vicente, São Paulo</UserInfoState>
                            <Stars star={2} size={20} />
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
                            {/* {userInfo.photos.map((item, key) => {
                                <SwiperItem key={key}>
                                    <SwiperImage source={{uri: item.url}} resizeMode="cover" />
                                </SwiperItem>
                            })} */}

                                <SwipeItem>
                                    <SwipeImage source={require('../../images/fundo.png')} resizeMode="cover" />
                                </SwipeItem>

                                <SwipeItem>
                                    <SwipeImage source={require('../../images/fundo.png')} resizeMode="cover" />
                                </SwipeItem>
                        </Swiper>

                        <Line />

                        <ServiceTitle>Descrição</ServiceTitle>
                        <ServiceDescription>Descrição aqui.</ServiceDescription>

                        <Line />
                        
                        <ServiceTitle>Dias da semana aceitos</ServiceTitle>
                        <ServiceDescription>Segunda-feira, Terça-feira e Quinta-feira.</ServiceDescription>

                        <Line />

                        <ServiceTitle>Preço médio</ServiceTitle>
                        <ServiceDescription>20 reais a hora.</ServiceDescription>

                        <Line />

                        <ServiceTitle>Animais aceitos</ServiceTitle>
                        <Animals animals={2} size={30} />

                        <Line />

                        <ServiceTitle>Portes aceitos</ServiceTitle>
                        <ServiceDescription>Pequeno e Médio.</ServiceDescription>

                        <Line />

                        <ServiceTitle>Medicação oral</ServiceTitle>
                        <ServiceDescription>Sim.</ServiceDescription>

                        <Line />

                        <ServiceTitle>Medicação injetável</ServiceTitle>
                        <ServiceDescription>Não.</ServiceDescription>

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