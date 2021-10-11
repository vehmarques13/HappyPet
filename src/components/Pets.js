import React, { useContext } from 'react';
import { Text, ImageBackground } from 'react-native';
import styled from 'styled-components/native';

import FemaleIcon from '../images/female.svg';
import MaleIcon from '../images/male.svg';
import DeleteIcon from '../images/delete.svg';

const PetsArea = styled.View`
    flex-direction: row;
    margin-top: 15px;
`;

const PetsView = styled.View`
    width: 150px;
    background: #FFFFFF;
    border-radius: 12px;
    border: 1px solid rgba(230, 230, 230, 0.8);
    margin-right: 10px;
`;

const PetInfo = styled.View`
    width: 100%;
    padding: 10px 10px 10px 15px;
`;

const OrganizationTitle = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const OrganizationArea = styled.View`
    flex-direction: row;
`;

const PetName = styled.Text`
    font-weight: bold;
    font-size: 16px;
    color: #1C263F;
    margin-right: 5px;
`;

const PetAge = styled.Text`
    font-weight: 400;
    font-size: 12px;
    color: #414141;
`;

const PetImage = styled.Image`
    width: 110px;
    height: 110px;
`;

export default () => {
    return (
        <PetsArea>
            <PetsView>
                <ImageBackground 
                    source={require('../images/fundo2.png')} 
                    resizeMode="cover" 
                    style={{ width: '100%', borderRadius: 12, marginBottom: 10, alignItems: 'center' }} 
                >
                    <PetInfo>
                        <OrganizationTitle>
                            <OrganizationArea>
                                <PetName>Luna</PetName>
                                <FemaleIcon width="18" height="18" fill="#1C263F"/> 
                            </OrganizationArea>
                            <DeleteIcon width="15" height="15" fill="#00B1E1"/>
                        </OrganizationTitle>
                        <PetAge>1 ano e 5 meses</PetAge>
                    </PetInfo>

                    <PetImage source={require('../images/avatarPetFemea.jpg')}/>
                </ImageBackground>
            </PetsView>
        </PetsArea>
    );
}