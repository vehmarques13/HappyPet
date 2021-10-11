import React from 'react';
import styled from 'styled-components/native';

export const SignInput = styled.TextInput`
    width: 100%;
    height: 40px;
    border-bottom-width: 1px;
    border-bottom-color: #E6E6E6;
`;

export default ({value, onChangeText, password, keyboardType, type}) => {
    return (
        <SignInput
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={password}
            keyboardType={keyboardType}
            type={type}
        >
        </SignInput>
    );
}