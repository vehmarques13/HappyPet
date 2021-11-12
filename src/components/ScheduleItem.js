import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';

import Api from '../Api';

import DeleteIcon from '../images/delete.svg';

const ScheduleArea = styled.View`
    background-color: #FFFFFF;
    border-radius: 12px;
    padding: 10px;
    flex-direction: row;
    width: 130px;
    border: 1px solid rgba(230, 230, 230, 1);
    margin: 0 10px 0 0;
`;

const InfoArea = styled.View`
    flex: 1;
    align-items: center;
`;

const UserName = styled.Text`
    font-weight: bold;
    font-size: 20px;
    color: #1C263F;
    width: 90%;
    text-align: center;
    margin: 5px 0;
`;

const Service = styled.Image`
    width: 100px;
    height: 100px;
    margin: 5px 0 13px 0;
`;

const Line = styled.View`
    width: 100%;
    border: 1px solid rgba(230, 230, 230, 1);
    margin-bottom: 10px;
`;

const Time = styled.Text`
    font-weight: bold;
    font-size: 19px;
    color: #00B1E1;
    margin-bottom: 5px;
`;

const OrganizationTitle = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const ButtonArea = styled.TouchableOpacity``;

export default ({data, funcRefresh = null}) => {
    let date = new Date(data.diaHora);

    const fotoTipoServico = () => {
        switch(data.tipoServico) {
            case 1:
                return require('../images/veterinario.jpg');
            case 2:
                return require('../images/banho.jpg');
            case 3:
                return require('../images/passeio.jpg');
            case 4:
                return require('../images/adestramento.jpg');
            case 5:
                return require('../images/petsitter.jpg');
            case 6:
                return require('../images/hospedagem.jpg');
            default:
                return require('../images/hospedagem.jpg');
        }
    }

    const deleteSchedule = async (id) => {
        let email = await AsyncStorage.getItem('email');
        let res = await Api.deleteSchedule(email, id);

        await funcRefresh();
    }

    useEffect(() => {
        fotoTipoServico();
    }, []);

    return (
        <ScheduleArea>
            <InfoArea>   
                <OrganizationTitle> 
                    <UserName>{data.nomeUsuario.substring(0, data.nomeUsuario.indexOf(' ') == -1 ? data.nomeUsuario.length : data.nomeUsuario.indexOf(' '))}</UserName>
                    <ButtonArea onPress={() => deleteSchedule(data.id)}>
                        <DeleteIcon style={{ marginRight: 5 }} width="15" height="15" fill="#00B1E1"/>
                    </ButtonArea>
                </OrganizationTitle>
                <Line/>
                <Service source={fotoTipoServico()} />
                <Time>{date.toLocaleTimeString('pt-BR').substring(0, date.toLocaleTimeString('pt-BR').lastIndexOf(':'))}</Time>
            </InfoArea>
        </ScheduleArea>
    );
}