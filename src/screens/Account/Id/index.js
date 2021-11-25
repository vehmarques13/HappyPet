import React, { useState, useEffect } from 'react';
import { ImageBackground, FlatList, Linking, Text } from 'react-native';
import { Container, Scroller, HeaderArea, HeaderTitle, Name, PageBody, Line, UserInfoArea, UserInfo, Avatar, UserInfoName, UserInfoState, UserInfoBirth, UserButton, LoadingIcon, ServiceArea, ServiceTitle, OrganizationArea, BackButton, PetArea, PetTitle } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import Api from '../../../Api';
import AsyncStorage from '@react-native-community/async-storage';

import ExperienceItem from '../../../components/ExperienceItem';
import Stars from '../../../components/Stars';
import Rating from '../../../components/Rating';

import ChatIcon from '../../../images/chat.svg';
import BackIcon from '../../../images/back.svg';

export default ({route}) => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [info, setInfo] = useState([]);
    const [tipoUsuario, setTipoUsuario] = useState("");
    const [name, setName] = useState("");

    let email = route.params?.email;

    const getUserInfo = async () => {
        setLoading(true);

        setList([]);
        let res = await Api.getUser(email);

        if (res != undefined) {
            setList(res);
        }

        setLoading(false);
    }

    const pegarTipoUsuario = async () => {
        setTipoUsuario(await AsyncStorage.getItem('tipoUsuario'));
    }

    const getInfo = async () => {
        setLoading(true);
        
        setInfo([]);

        let res = await Api.getInformation(email);

        if (res.error == undefined) {
            setInfo(res.experiencias);
        }

        setLoading(false);
    }

    const handleBackClick = () => {
        navigation.navigate('Service', { id: list.id, email: list.email });
    }

    const pegarNome = async () => {
        setName(await AsyncStorage.getItem('nome'));
    }

    useEffect(() => {
        getUserInfo();
        getInfo();
        pegarTipoUsuario();
        pegarNome();
    }, []);

    let date = new Date(list.nascimento);

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
                    source={require('../../../images/fundo4.png')}
                    resizeMode="cover"
                    style={{ width: '100%', height: 150, justifyContent: 'center', alignItems: 'center' }}
                />

                <PageBody>
                    <UserInfoArea>
                        {console.log(list)}
                        {list.genero == "Masculino" ?
                            <Avatar source={require('../../../images/avatar.jpg')} />
                        : <Avatar source={require('../../../images/avatarMulher.jpg')} />
                        }
                        <UserInfo>
                            {loading &&
                                <LoadingIcon
                                    size='large'
                                    color='#20283D'
                                />
                            }
                            
                            <UserInfoName>{list.nome}</UserInfoName>
                            <UserInfoState>{list.cidade}, {list.estado}</UserInfoState>
                            {list.tipoUsuario == 2 ? 
                                <UserInfoBirth>{list.servicos}</UserInfoBirth>
                            : <Text></Text>}
                            <UserInfoBirth>{date.getUTCDate()}/{date.getMonth() + 1}/{date.getUTCFullYear()}</UserInfoBirth>
                            <Stars stars={list.mediaAvaliacao} size={20} />
                        </UserInfo>
                        {tipoUsuario == "1" ?
                            <UserButton onPress={()=> { Linking.openURL("https://wa.me/55" + list.telefone) }}>
                                <ChatIcon width="20" height="20" fill="#00B1E1" />
                            </UserButton>
                        : <Text></Text> }
                    </UserInfoArea>

                    <ServiceArea style={{marginTop: 28}}>
                        <OrganizationArea >
                            <ServiceTitle>Experiências</ServiceTitle>
                        </OrganizationArea>
                        {info.length != 0 ?
                        <FlatList
                            style={{ marginTop: -8 }}
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            legacyImplementation={false}
                            data={info}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => <ExperienceItem data={item} />} />
                            : <Text>Não há experiências cadastradas.</Text>}
                    </ServiceArea>
                    

                    <Line />

                    <ServiceArea>
                        <OrganizationArea>
                            <ServiceTitle>Avaliações</ServiceTitle>
                        </OrganizationArea>
                        {list.length != 0 ?
                            <FlatList
                                style={{ marginTop: 2 }}
                                pagingEnabled={true}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                legacyImplementation={false}
                                data={list.avaliacoes}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => <Rating data={item} />} />
                        : <Text>Não há avaliações cadastradas.</Text>}
                    </ServiceArea>
                </PageBody>
            </Scroller>
        </Container>
    );
}