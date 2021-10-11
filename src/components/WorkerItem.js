import React, { useContext } from 'react';
import styled from 'styled-components/native';

import Stars from '../components/Stars';
import Animals from '../components/Animals';
import Favorites from '../components/Favorites';

import { useNavigation } from '@react-navigation/native';

const Area = styled.TouchableOpacity`
    background-color: #FFFFFF;
    border-radius: 12px;
    padding: 10px;
    flex-direction: row;
    padding: 10px 10px 0 10px;
    border: 1px solid rgba(230, 230, 230, 0.8);
`;

const Avatar = styled.Image`
    width: 90px;
    height: 105px;
`;

const InfoArea = styled.View`
    flex: 1;
    margin-left: 8px;
    justify-content: space-between;
`;

const UserName = styled.Text`
    font-weight: bold;
    font-size: 17px;
    color: #1C263F;
`;

const UserState = styled.Text`
    font-weight: 500;
    font-size: 14px;
    color: #858585;
`;

const OrganizationArea = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const UserServices = styled.Text`
    font-weight: normal;
    font-size: 12px;
    color: #929292;
`;

export default ({data}) => {

    const navigation = useNavigation();

    const handleClick = () => {
        navigation.navigate('Service');
        // navigation.navigate('Service', {
        //     id: data.id,
        //     avatar: data.avatar,
        //     name: data.name,
        //     stars: data.stars
        // }); 
    }

    return (
        <Area onPress={handleClick}>
            {/* <Avatar source={{uri: data.avatar}} /> */}
            <Avatar source={require('../images/avatar.jpg')}/>
            <InfoArea>    
                <OrganizationArea>
                    <UserName numberOfLines={2}>Bruno Sampaio de Morais</UserName>
                    <Favorites favorites={1} />
                </OrganizationArea>
                <UserState>São Vicente, São Paulo</UserState>
                <UserServices>Passeio</UserServices>
                <OrganizationArea style={{paddingBottom: 8}}>
                    <Stars stars={2} size={20} />
                    <Animals animals={2} size={20} />
                </OrganizationArea>
            </InfoArea>
        </Area>
    );
}