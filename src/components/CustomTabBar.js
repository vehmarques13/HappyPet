import React, { useContext } from 'react';
import styled from 'styled-components/native';

import HomeIcon from '../images/home.svg';
import FavoritesIcon from '../images/favorite.svg';
import AccountIcon from '../images/account.svg';
import ScheduleIcon from '../images/schedule.svg';

import { UserContext } from '../contexts/UserContext';

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

const AvatarIcon = styled.Image`
    width: 24px;
    height: 24px;
    border-radius: 12px;
`;

export default ({ state, navigation }) => {

    const { state:user } = useContext(UserContext);

    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }

    return (
        <TabArea>
            <TabItem onPress={() => goTo('HomeTutor')}>
                <HomeIcon width="24" height="24" fill="#6B6B6B" style={{opacity: state.index === 0 ? 1 : 0.7}} />
                <TextIcon style={{opacity: state.index === 0 ? 1 : 0.7}}>Home</TextIcon>
            </TabItem>
            <TabItem onPress={() => goTo('Favorites')}>
                <FavoritesIcon width="24" height="24" fill="#6B6B6B" style={{opacity: state.index === 1 ? 1 : 0.7}} />
                <TextIcon style={{opacity: state.index === 1 ? 1 : 0.7}}>Favoritos</TextIcon>
            </TabItem>
            <TabItem onPress={() => goTo('Schedule')}>
                <ScheduleIcon width="24" height="24" fill="#6B6B6B" style={{opacity: state.index === 2 ? 1 : 0.7}} />
                <TextIcon style={{opacity: state.index === 2 ? 1 : 0.7}}>Agenda</TextIcon>
            </TabItem>
            <TabItem onPress={() => goTo('AccountServiceProvider')}>
                {user.avatar != '' ?
                    <AvatarIcon source={{uri: use.avatar}} /> 
                :
                    <AccountIcon width="24" height="24" fill="#6B6B6B" style={{opacity: state.index === 3 ? 1 : 0.7}} />   
                }
                <TextIcon style={{opacity: state.index === 3 ? 1 : 0.7}}>Perfil</TextIcon>
            </TabItem>
        </TabArea>
    );
}