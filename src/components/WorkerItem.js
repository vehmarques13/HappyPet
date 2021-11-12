import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

import Stars from '../components/Stars';
import Animals from '../components/Animals';
import Favorites from '../components/Favorites';

import Api from '../Api';

import DeleteIcon from '../images/delete.svg';

const Area = styled.TouchableOpacity`
    background-color: #FFFFFF;
    border-radius: 12px;
    padding: 10px;
    flex-direction: row;
    padding: 10px 10px 0 10px;
    border: 1px solid rgba(230, 230, 230, 0.8);
    margin-bottom: 10px;
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

const AnimalsArea = styled.View`
    flex-direction: row;
`;

const ButtonArea = styled.TouchableOpacity``;

export default ({data, funcRefresh = null}) => {
    
    const navigation = useNavigation();
    let id = data.id;
    let email = data.email;

    const handleClick = () => {
        navigation.navigate('Service', { id: id, email: email });
    }

    const tipoServico = () => {
        switch(data.tipoServico) {
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
        tipoServico();
    }, []);

    const deleteService = async (id) => {
        let email = await AsyncStorage.getItem('email');
        let res = await Api.deleteServices(email, id);

        await funcRefresh();
    }

    return (
        <Area onPress={handleClick}>
            <Avatar source={require('../images/avatar.jpg')}/>
            <InfoArea>    
                <OrganizationArea>
                    <UserName>{data.nome}</UserName>
                    {data.tipoUsuario == 1 ?
                        <Favorites favorites={1} />
                    :   <ButtonArea onPress={() => deleteService(data.id)}>
                            <DeleteIcon style={{ marginRight: 5 }} width="15" height="15" fill="#00B1E1"/>
                        </ButtonArea>
                    }
                </OrganizationArea>
                <UserState>{data.cidade}, {data.estado}</UserState>
                <UserServices>{tipoServico()}</UserServices>
                <OrganizationArea style={{paddingBottom: 8}}>
                    <Stars stars={data.avaliacao} size={20} />
                    <AnimalsArea>
                        {data.filtro.tiposPet.map((item, k) => (
                            <Animals key={k} animals={item} size={20} />
                        ))}
                    </AnimalsArea>
                </OrganizationArea>
            </InfoArea>
        </Area>
    );
}