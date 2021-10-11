import React, { useState, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { Container, Scroller, HeaderArea, HeaderTitle, PageBody, Line, UserInfoArea, UserInfo, Avatar, UserInfoName, UserInfoState, UserInfoBirth, UserButton, LoadingIcon, ServiceArea, ServiceTitle, OrganizationArea, BackButton } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import Api from '../../../Api';

import ExperienceItem from '../../../components/ExperienceItem';
import CertificationItem from '../../../components/CertificationItem';
import Stars from '../../../components/Stars';

import ChatIcon from '../../../images/chat.svg';
import BackIcon from '../../../images/back.svg';
import AddIcon from '../../../images/add2.svg';

export default () => {
    this.state = {
      feed:[
        {id: 1, nome: 'Joseffe', idade: 32, email: 'joseffe@gmail.com'},
        {id: 2, nome: 'João', idade: 17, email: 'joao@gmail.com'},
        {id: 3, nome: 'Maria', idade: 22, email: 'maria@gmail.com'},
        {id: 4, nome: 'Joaquim', idade: 42, email: 'joaquim@gmail.com'},
        {id: 5, nome: 'Paulo', idade: 36, email: 'paulo@gmail.com'},
      ]
    } 

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

    const handleGoBackButton = () => {
        navigation.goBack();
    }

    const handleClick = () => {
        navigation.navigate('Service');
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

                <ImageBackground 
                    source={require('../../../images/fundo.png')} 
                    resizeMode="cover" 
                    style={{ width: '100%', height: 150, justifyContent: 'center', alignItems: 'center' }} 
                />

                <PageBody>
                    <UserInfoArea>
                        <Avatar source={require('../../../images/avatar.jpg')} />
                        <UserInfo>
                            <UserInfoName>Bruno Sampaio de Morais</UserInfoName>
                            <UserInfoState>São Vicente, São Paulo</UserInfoState>
                            <UserInfoBirth>25/07/2001</UserInfoBirth>
                            <Stars stars={2} size={20} />
                        </UserInfo>
                        <UserButton>
                            <ChatIcon width="20" height="20" fill="#00B1E1" />
                        </UserButton>
                    </UserInfoArea>

                    <ServiceArea>
                        <OrganizationArea>
                            <ServiceTitle>Experiências</ServiceTitle>
                            <AddIcon width="28" height="28" fill="#00B1E1" />
                        </OrganizationArea>
                        <ExperienceItem />

                        <Line />

                        <OrganizationArea style={{marginTop: 10}}>
                            <ServiceTitle>Certificações</ServiceTitle>
                            <AddIcon width="28" height="28" fill="#00B1E1" />
                        </OrganizationArea>
                        <CertificationItem />
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