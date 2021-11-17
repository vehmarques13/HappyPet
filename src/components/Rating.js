import React from 'react';
import styled from 'styled-components/native';

import Stars from '../components/Stars';

const Area = styled.View`
    background-color: #FFFFFF;
    border-radius: 12px;
    padding: 10px;
    flex-direction: row;
    border: 1px solid rgba(230, 230, 230, 0.8);
    margin: 0 10px 10px 0;
`;

const InfoArea = styled.View`
    flex: 1;
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

export default ({data}) => {
    return (
        <Area>
            <InfoArea>    
                <UserName>{data.nomeAvaliador}</UserName>
                <Stars stars={data.estrelas} size={20} />
                <UserState>{data.comentario}</UserState>
            </InfoArea>
        </Area>
    );
}