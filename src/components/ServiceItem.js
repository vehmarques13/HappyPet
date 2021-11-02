import React from 'react';
import styled from 'styled-components/native';

const ServicesArea = styled.View`
    flex-direction: row;
    margin-top: 15px;
`;

const ServicesView = styled.View`
    width: 120px;
    background: #FFFFFF;
    border-radius: 12px;
    border: 1px solid rgba(230, 230, 230, 0.8);
    justify-content: center;
    align-items: center;
    padding: 5px 0 15px 0;
`;

const ServiceName = styled.Text`
    font-weight: bold;
    font-size: 16px;
    color: #1C263F;
`;

const ServiceImage = styled.Image`
    width: 100px;
    height: 100px;
`;

export default () => {
    return (
        <ServicesArea>
            <ServicesView>
                <ServiceImage source={require('../images/passeio.jpg')}/>
                <ServiceName>Passeio</ServiceName>
            </ServicesView>
        </ServicesArea>
    );
}