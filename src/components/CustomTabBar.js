import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';

import HomeIcon from '../images/home.svg';
import FavoritesIcon from '../images/favorite.svg';
import AccountIcon from '../images/account.svg';
import ScheduleIcon from '../images/schedule.svg';

const TabArea = styled.View`
    height: 60px;
    background-color: #FFFFFF;
    flex-direction: row;
    border: 1px solid rgba(230, 230, 230, 0.6);
`;

const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const TextIcon = styled.Text`
    font-weight: 500;
    font-size: 11.5px;
    color: #6B6B6B;
`;

export default ({ state, navigation }) => {

    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }

    const [userInfo, setUserInfo] = useState('');

    const tipoUsuario = async () => {
        let tipoUsuario = await AsyncStorage.getItem('tipoUsuario');
        setUserInfo(tipoUsuario);
    }

    useEffect(() => {
        tipoUsuario();
    }, []);

    return (
        <TabArea>
            {userInfo == "1" ?
                <TabItem onPress={() => goTo('HomeTutor')}>
                    <HomeIcon width="24" height="24" fill="#6B6B6B" style={{opacity: state.index === 0 ? 1 : 0.7}} />
                    <TextIcon style={{opacity: state.index === 0 ? 1 : 0.7}}>Home</TextIcon>
                </TabItem>
            : 
            <TabItem onPress={() => goTo('HomeServiceProvider')}>
                <HomeIcon width="24" height="24" fill="#6B6B6B" style={{opacity: state.index === 0 ? 1 : 0.7}} />
                <TextIcon style={{opacity: state.index === 0 ? 1 : 0.7}}>Home</TextIcon>
            </TabItem>
            }
            {userInfo == "1" ?
                <TabItem onPress={() => goTo('Favorites')}>
                    <FavoritesIcon width="24" height="24" fill="#6B6B6B" style={{opacity: state.index === 1 ? 1 : 0.7}} />
                    <TextIcon style={{opacity: state.index === 1 ? 1 : 0.7}}>Favoritos</TextIcon>
                </TabItem>
            :
                <TabItem onPress={() => goTo('Schedule')}>
                    <ScheduleIcon width="24" height="24" fill="#6B6B6B" style={{opacity: state.index === 2 ? 1 : 0.7}} />
                    <TextIcon style={{opacity: state.index === 2 ? 1 : 0.7}}>Agenda</TextIcon>
                </TabItem>
            }
            {userInfo == "1" ?
                <TabItem onPress={() => goTo('AccountTutor')}>
                    <AccountIcon width="24" height="24" fill="#6B6B6B" style={{opacity: state.index === 3 ? 1 : 0.7}} />   
                    <TextIcon style={{opacity: state.index === 3 ? 1 : 0.7}}>Perfil</TextIcon>
                </TabItem>
            :
                <TabItem onPress={() => goTo('AccountServiceProvider')}>
                    <AccountIcon width="24" height="24" fill="#6B6B6B" style={{opacity: state.index === 3 ? 1 : 0.7}} />   
                    <TextIcon style={{opacity: state.index === 3 ? 1 : 0.7}}>Perfil</TextIcon>
                </TabItem>
            }
        </TabArea>
    );
}