import React, { useState, useEffect } from 'react';
import { Container, Scroller, HeaderArea, HeaderTitle, Name, SwipeDot, SwipeDotActive, SwipeItem, SwipeImage, PageBody, UserInfoArea, UserInfo, Avatar, UserInfoName, UserInfoState, UserServices, UserButton, LoadingIcon, ServiceArea, ServiceTitle, ServiceDescription, Line, BackButton, AnimalsArea, FavoriteArea, FavoriteView } from './styles';
import { useNavigation } from '@react-navigation/native';
import Api from '../../Api';
import Swiper from 'react-native-swiper';
import { ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Animals from '../../components/Animals';

import ChatIcon from '../../images/chat.svg';
import BackIcon from '../../images/back.svg';
import FavoritesFull from '../../images/favorite_full.svg';
import FavoritesEmpty from '../../images/favorite.svg';
import DeleteIcon from '../../images/delete.svg';

export default ({route}) => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [filtros, setFiltro] = useState([]);
    const [tipoUsuario, setTipoUsuario] = useState("");
    const [name, setName] = useState("");

    let id = route.params?.id;
    let email = route.params?.email;
    let tipoServicos = route.params?.tipoServicos;

    const getServiceInfo = async () => {
        let tipoUsuario = await AsyncStorage.getItem('tipoUsuario');
        let emailLogado = await AsyncStorage.getItem('email');

        setLoading(true);

        setList([]);
        setFiltro([]);

        if (tipoUsuario == "1") {
            let res = await Api.getServiceById(email, id, emailLogado);

            setList(res);
            setFiltro(res.filtro);
        }
        else {
            let rota = `?email=${emailLogado}&servico=${tipoServicos}`;

            console.log(rota);
            let res = await Api.getServices(rota);

            setList(res[0]);
            setFiltro(res[0].filtro);
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

    const pegarNome = async () => {
        setName(await AsyncStorage.getItem('nome'));
    }

    const deleteService = async (id) => {
        let email = await AsyncStorage.getItem('email');
        let res = await Api.deleteServices(email, id);

        navigation.reset({
            routes:[{name: 'MainTab'}]
        });
    }

    const pegarTipoUsuario = async () => {
        setTipoUsuario(await AsyncStorage.getItem('tipoUsuario'));
    }

    const tipoServico = () => {
        switch(list.tipoServico) {
            case 0:
                return "Veterinário";
            case 1:
                return "Banho e Tosa";
            case 2:
                return "Passeio";
            case 3:
                return "Adestramento";
            case 3:
                return "Pet Sitter";
            case 3:
                return "Hospedagem";
            default:
                return "Serviço indefinido!";
        }
    }

    useEffect(() => {
        getServiceInfo();
        tipoServico();
        pegarTipoUsuario();
        pegarNome();
    }, []);

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
                            <UserServices>{tipoServico()}</UserServices>
                        </UserInfo>
                        {tipoUsuario == "1" ?
                            <>
                                <UserButton onPress={() => IconFavorites(list.id, list.email, list.isFavorito)}>
                                    <FavoriteArea>
                                        <FavoriteView>
                                            {list.isFavorito == false && <FavoritesEmpty width="23" height="23" fill="#00B1E1" />}
                                            {list.isFavorito == true && <FavoritesFull width="23" height="23" fill="#00B1E1" />}
                                        </FavoriteView>
                                    </FavoriteArea>
                                </UserButton>
                            </>
                        :  
                            <UserButton onPress={()=> { deleteService(list.id) }}>
                                <DeleteIcon width="20" height="20" fill="#00B1E1" />
                            </UserButton>
                        }
                    </UserInfoArea>

                    <ServiceArea>
                        <ServiceTitle>Descrição</ServiceTitle>
                        <ServiceDescription>{list.descricao}</ServiceDescription>

                        <Line />

                        <ServiceTitle>Preço médio</ServiceTitle>
                        <ServiceDescription>R$ {list.precoMedio?.toString().replace(".", ",")}</ServiceDescription>

                        <Line />

                        <ServiceTitle>Animais aceitos</ServiceTitle>
                        {filtros.tiposPet == undefined ? 
                            <ServiceDescription>Não aceita nenhum animal.</ServiceDescription>  
                        :
                            <AnimalsArea>
                                {filtros.tiposPet.map((item, k) => (
                                    <Animals key={k} animals={item} size={22} />
                                ))}
                            </AnimalsArea>
                        }

                        <Line />

                        <ServiceTitle>Portes aceitos</ServiceTitle>
                        {filtros.pesos == undefined ? 
                            <ServiceDescription>Não aceita nenhum porte.</ServiceDescription>  
                        :
                            <AnimalsArea>
                                {filtros.pesos.map((item, k) => (
                                    <ServiceDescription>{item}; </ServiceDescription>
                                ))}
                            </AnimalsArea>
                        }

                        <Line />

                        <ServiceTitle>Medicação oral</ServiceTitle>
                        {filtros.medicacaoOral == undefined ? 
                            <ServiceDescription></ServiceDescription> 
                        :
                            <ServiceDescription>{filtros.medicacaoOral == true ? "Sim" : "Não"}</ServiceDescription>
                        }

                        <Line />

                        <ServiceTitle>Medicação injetável</ServiceTitle>
                        {filtros.medicacaoInjetavel == undefined ? 
                            <ServiceDescription></ServiceDescription> 
                        :
                            <ServiceDescription>{filtros.medicacaoInjetavel == true ? "Sim" : "Não"}</ServiceDescription>
                        }

                        <Line />

                        <ServiceTitle>Curativo</ServiceTitle>
                        {filtros.curativo == undefined ? 
                            <ServiceDescription></ServiceDescription> 
                        :
                            <ServiceDescription>{filtros.curativo == true ? "Sim" : "Não"}</ServiceDescription>
                        }

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