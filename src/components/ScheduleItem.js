import React from 'react';
import styled from 'styled-components/native';

const ScheduleArea = styled.View`
    background-color: #FFFFFF;
    border-radius: 12px;
    padding: 10px;
    flex-direction: row;
    width: 130px;
    border: 1px solid rgba(230, 230, 230, 1);
    margin: 15px 10px 0 0;
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

export default ({data}) => {
    return (
        <ScheduleArea>
            <InfoArea>    
                <UserName>Bruno</UserName>
                <Line/>
                <Service source={require('../images/banho.jpg')} />
                <Time>11:30</Time>
            </InfoArea>
        </ScheduleArea>
    );
}