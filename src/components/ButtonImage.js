import React from 'react';
import styled from 'styled-components/native';
import { launchImageLibrary } from 'react-native-image-picker';

import Add from '../images/add.svg';

export const ButtonImage = styled.TouchableOpacity`
    width: 79px;
    height: 77px;
    background-color: white;
    border: 1px solid rgba(219, 219, 219, 0.7);
    border-radius: 6px;
    justify-content: center;
    align-items: center;
    margin: 8px 8px 0 0;
`;

export const ImageArea = styled.View`
    width: 100%;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
`;

const imagePickerCallBack = (data) => {
    return data;
}

export default () => {
    return (
        <ImageArea>
            <ButtonImage onPress={() => launchImageLibrary({}, imagePickerCallBack)}> 
                <Add width="23" height="23" fill="rgba(219, 219, 219, 0.9)"/>
            </ButtonImage>
        </ImageArea>
    );
}