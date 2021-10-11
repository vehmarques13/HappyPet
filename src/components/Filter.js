import React from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import FilterIcon from '../images/filter.svg';
import DogIcon from '../images/dog.svg';
import CatIcon from '../images/cat.svg';
import BirdIcon from '../images/bird.svg';
import HamsterIcon from '../images/hamster.svg';

const FilterArea = styled.View`
    flex-direction: row;
    margin-top: 15px;
`;

const FilterFull = styled.TouchableOpacity`
    width: 45px;
    height: 45px;
    border-radius: 15px; 
    background-color: white;
    border: 1px solid rgba(230, 230, 230, 1);
    justify-content: center;
    align-items: center;
`;

const FilterPet = styled.TouchableOpacity`
    width: 112px;
    height: 45px;
    border-radius: 15px; 
    background-color: white;
    border: 1px solid rgba(230, 230, 230, 1);
    flex-direction: row;
    padding: 5px 10px;
    align-items: center;
    margin-left: 8px;
`;

const FilterPetSmall = styled.TouchableOpacity`
    width: 85px;
    height: 45px;
    border-radius: 15px; 
    background-color: white;
    border: 1px solid rgba(230, 230, 230, 1);
    flex-direction: row;
    padding: 5px 10px;
    align-items: center;
    margin-left: 8px;
`;

const FilterText = styled.Text`
    color: #858585;
    font-weight: 500;
    font-size: 13px;
    margin-left: 5px;
`;

export default ({data}) => {

    const ANIMALS = ['Dog'];

    return (
        <FlatList
            horizontal
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            legacyImplementation={false}
            data={ANIMALS}
            renderItem={(animal) => {
                return (
                    <FilterArea>
                        <FilterFull>
                            <FilterIcon width="26" height="26" fill="#858585"/>
                        </FilterFull>
            
                        <FilterPet>
                            <DogIcon width="22" height="22" fill="#1C263F" />
                            <FilterText>Cachorros</FilterText>
                        </FilterPet>
            
                        <FilterPetSmall>
                            <CatIcon width="22" height="22" fill="#1C263F" />
                            <FilterText>Gatos</FilterText>
                        </FilterPetSmall>
            
                        <FilterPet>
                            <BirdIcon width="22" height="22" fill="#1C263F" />
                            <FilterText>Passáros</FilterText>
                        </FilterPet>
            
                        <FilterPet>
                            <HamsterIcon width="22" height="22" fill="#1C263F" />
                            <FilterText>Roedores</FilterText>
                        </FilterPet>
                    </FilterArea>
                );
            }}
        />
    );
}