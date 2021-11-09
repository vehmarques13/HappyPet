import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';

import FilterIcon from '../images/filter.svg';
import DogIcon from '../images/dog.svg';
import CatIcon from '../images/cat.svg';
import BirdIcon from '../images/bird.svg';
import HamsterIcon from '../images/hamster.svg';

const FilterArea = styled.View`
    flex-direction: row;
    margin-top: 15px;
`;

const FilterPetSmall = styled.TouchableOpacity`
    width: 98px;
    height: 45px;
    border-radius: 15px; 
    background-color: white;
    border: 1px solid rgba(230, 230, 230, 1);
    flex-direction: row;
    padding: 5px 10px;
    align-items: center;
    margin-right: 8px;
`;

const FilterText = styled.Text`
    color: #858585;
    font-weight: 500;
    font-size: 13px;
    margin-left: 5px;
`;

export default ({data, funcRefresh = null}) => {
    const handleClick = async (animal) => {
        await AsyncStorage.setItem('tipoAnimal', animal);
        await funcRefresh();
    }

    const tipoPet = () => {
        switch(data.value) {
            case "Canino":
                return <DogIcon width="22" height="22" fill="#1C263F" />;
            case "Pássaro":
                return <BirdIcon width="22" height="22" fill="#1C263F" />;
            case "Felino":
                return <CatIcon width="22" height="22" fill="#1C263F" />;
            case "Roedor":
                return <HamsterIcon width="22" height="22" fill="#1C263F" />;
            default:
                return "Outros";
        }
    }

    useEffect(() => {
        tipoPet();
    }, []);

    return (
        <FilterArea>
            <FilterPetSmall onPress={() => handleClick(data.value)}>
                {tipoPet()}
                <FilterText>{data.value}</FilterText>
            </FilterPetSmall>
        </FilterArea>
    );
}