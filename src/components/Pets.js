import React from 'react';
import { ImageBackground, Confirm } from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

import FemaleIcon from '../images/female.svg';
import MaleIcon from '../images/male.svg';
import DeleteIcon from '../images/delete.svg';
import DogIcon from '../images/dog.svg';
import CatIcon from '../images/cat.svg';
import BirdIcon from '../images/bird.svg';
import HamsterIcon from '../images/hamster.svg';

import Api from '../Api';

const PetsArea = styled.TouchableOpacity`
    flex-direction: row;
    margin-top: 15px;
`;

const PetsView = styled.View`
    width: 150px;
    background: #FFFFFF;
    border-radius: 10px;
    border: 1px solid rgba(230, 230, 230, 0.8);
    margin-right: 10px;
`;

const PetInfo = styled.View`
    width: 100%;
    padding: 10px 10px 0 15px;
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

const FilterPet = styled.View`
    width: 112px;
    border-radius: 15px; 
    background-color: white;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
`;

const FilterPetSmall = styled.View`
    width: 85px;
    border-radius: 15px; 
    background-color: white;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
`;

const FilterText = styled.Text`
    color: #858585;
    font-weight: 500;
    font-size: 13px;
    margin-left: 8px;
`;

const PetImageOrganization = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
`;

const PetImage = styled.Image`
    width: 110px;
    height: 110px;
`;

const ButtonArea = styled.TouchableOpacity``;

export default ({data, funcRefresh = null}) => {
    const navigation = useNavigation();

    const tipoPet = () => {
        switch(data.tipoPet) {
            case 0:
                return "Roedor"
            case 2:
                return "Pássaro";
            case 3:
                return "Felino";
            case 4:
                return "Canino";
            default:
                return "Outros";
        }
    }

    const deletePet = async (id) => {
        let email = await AsyncStorage.getItem('email');

        if (Confirm("Você deseja realmente excluir?")) {
            let res = await Api.deletePets(email, id);
            await funcRefresh();
        }
    }

    const handleClick = () => {
        navigation.navigate('Pet', { pet: data });
    }

    return (
        <PetsArea onPress={handleClick}>
            <PetsView>
                <ImageBackground 
                    source={require('../images/fundo4.png')} 
                    resizeMode="cover" 
                    style={{ width: '100%', alignItems: 'center' }} 
                    imageStyle={{ borderRadius: 10}}
                >
                    <PetInfo>
                        <OrganizationTitle>
                            <OrganizationArea>
                                <PetName>{data.nome}</PetName>
                                {data.sexo == "femea" ? 
                                    <FemaleIcon width="18" height="18" fill="#1C263F"/> 
                                : <MaleIcon width="18" height="18" fill="#1C263F"/> 
                                }
                            </OrganizationArea>
                            <ButtonArea onPress={() => deletePet(data.id)}>
                                <DeleteIcon width="15" height="15" fill="#00B1E1"/>
                            </ButtonArea>
                        </OrganizationTitle>
                        <PetAge>{data.raca}</PetAge>
                        {tipoPet() == "Roedor" ? 
                            <FilterPet>
                                <HamsterIcon width="22" height="22" fill="#1C263F" />
                                <FilterText>Roedor</FilterText>
                            </FilterPet>
                        : tipoPet() == "Pássaro" ? 
                            <FilterPet>
                                <BirdIcon width="22" height="22" fill="#1C263F" />
                                <FilterText>Passáro</FilterText>
                            </FilterPet>
                        : tipoPet() == "Felino" ?
                            <FilterPetSmall>
                                <CatIcon width="22" height="22" fill="#1C263F" />
                                <FilterText>Felino</FilterText>
                            </FilterPetSmall>
                        : 
                            <FilterPet>
                                <DogIcon width="22" height="22" fill="#1C263F" />
                                <FilterText>Canino</FilterText>
                            </FilterPet>
                        }
                    </PetInfo>

                    <PetImageOrganization>
                        {data.sexo == "femea" ?
                            <PetImage source={require('../images/avatarPetFemea2.png')}/>
                        :
                            <PetImage source={require('../images/avatarPetMacho2.png')}/>
                        }
                    </PetImageOrganization>
                </ImageBackground>
            </PetsView>
        </PetsArea>
    );
}