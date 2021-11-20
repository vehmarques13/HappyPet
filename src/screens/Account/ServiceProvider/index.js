import React, { useState, useEffect } from 'react';
import { ImageBackground, Text, FlatList } from 'react-native';
import { Container, Scroller, HeaderArea, HeaderTitle, PageBody, UserInfoArea, UserInfo, Avatar, UserInfoName, UserInfoState, UserInfoBirth, UserButton, LoadingIcon, Line, ServiceArea, ServiceTitle, OrganizationArea, Button } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import Api from '../../../Api';
import AsyncStorage from '@react-native-community/async-storage';

import ExperienceItem from '../../../components/ExperienceItem';
import Rating from '../../../components/Rating';
import Stars from '../../../components/Stars';

import EditIcon from '../../../images/edit.svg';
import AddIcon from '../../../images/add2.svg';

export default () => {

    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState([]);
    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(false);

    const getUserInfo = async () => {
        setLoading(true);

        let email = await AsyncStorage.getItem('email');
        let res = await Api.getUser(email);

        if (res.error == undefined) {
            setUserInfo(res);
        }
        else 
            console.log('Erro: ' + res.error);

        setLoading(false);
    }

    const getInfo = async () => {
        setLoading(true);
        
        setInfo([]);

        let email = await AsyncStorage.getItem('email');
        let res = await Api.getInformation(email);

        if (res.error == undefined) {
            setInfo(res.experiencias);
        }
        else 
            console.log('Erro: ' + res.error);

        setLoading(false);
    }

    useEffect(() => {
        getUserInfo();
        getInfo();
    }, []);

    const handleAddClick = () => {
        navigation.reset({
            routes:[{name: 'AddExperience'}]
        });
    }

    const handleEditClick = () => {
        navigation.navigate('EditAccount', { userInfo: userInfo });
    }

    let date = new Date(userInfo.nascimento);

    return (
        <Container>
            <Scroller>
                <HeaderArea>
                    <HeaderTitle>HAPPY PET</HeaderTitle>
                </HeaderArea>

                <ImageBackground 
                    source={require('../../../images/fundo4.png')} 
                    resizeMode="cover" 
                    style={{ width: '100%', height: 150, justifyContent: 'center', alignItems: 'center' }} 
                />

                <PageBody>
                    <UserInfoArea>
                        {userInfo.genero == "Masculino" ?
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
                            
                            <UserInfoName>{userInfo.nome}</UserInfoName>
                            <UserInfoState>{userInfo.cidade}, {userInfo.estado}</UserInfoState>
                            <UserInfoBirth>{date.getUTCDate()}/{date.getMonth() + 1}/{date.getUTCFullYear()}</UserInfoBirth>
                            <UserInfoBirth>{userInfo.servicos}</UserInfoBirth>
                            <Stars stars={userInfo.mediaAvaliacao} size={20} />
                        </UserInfo>
                        <UserButton onPress={handleEditClick}>
                            <EditIcon width="30" height="30" fill="#00B1E1" />
                        </UserButton>
                    </UserInfoArea>

                    <ServiceArea style={{marginTop: 28}}>
                        <OrganizationArea>
                            <ServiceTitle>Experiências</ServiceTitle>
                            <Button onPress={handleAddClick} >
                                <AddIcon width="28" height="28" fill="#00B1E1" />
                            </Button>
                        </OrganizationArea>
                        {info.length != 0 ? 
                            <FlatList 
                                style={{marginTop: -8}}
                                pagingEnabled={true}
                                showsHorizontalScrollIndicator={false}
                                legacyImplementation={false}
                                data={info}
                                keyExtractor={(item) => item.id}
                                renderItem={ ({item}) => <ExperienceItem data={item}/>}
                            /> 
                        : <Text>Não há experiências cadastradas.</Text>
                        }
                    </ServiceArea>

                    <Line />

                    <ServiceArea>
                        <OrganizationArea>
                            <ServiceTitle>Avaliações</ServiceTitle>
                        </OrganizationArea>
                        {userInfo.length != 0 ? 
                            <FlatList 
                                style={{marginTop: 2}}
                                pagingEnabled={true}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                legacyImplementation={false}
                                data={userInfo.avaliacoes}
                                keyExtractor={(item) => item.id}
                                renderItem={ ({item}) => <Rating data={item}/>}
                            /> 
                        : <Text>Não há avaliações cadastradas.</Text>
                        }
                    </ServiceArea>
                </PageBody>
            </Scroller>
        </Container>
    );
}