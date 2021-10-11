import React from 'react';
import { ImageBackground } from 'react-native';
import { Container, Name, Box, Title, Subtitle, Question, Form, Type, TypeText } from './styles';

import { useNavigation } from '@react-navigation/native';

export default () => {

    const navigation = useNavigation();

    const handleButtonClickTutor = () => {
        navigation.reset({
            routes: [{name: 'SignUpTutor'}]
        });
    }

    const handleButtonClickServiceProvider = () => {
        navigation.reset({
            routes: [{name: 'SignUpServiceProvider'}]
        });
    }

    return (
        <Container>
            <ImageBackground 
                source={require('../../images/fundo.png')} 
                resizeMode="cover" 
                style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} 
            >
            <Name>HAPPY PET</Name>

            <Box>
                <Title>Seja bem vindo(a)!</Title>
                <Subtitle>Faça seu cadastro</Subtitle>

                <Question>Você é um:</Question>

                <Form>
                    <Type onPress={handleButtonClickTutor}>
                        <TypeText>Tutor</TypeText>
                    </Type>

                    <Type onPress={handleButtonClickServiceProvider}>
                        <TypeText>Prestador de serviços</TypeText>
                    </Type>
                </Form>
            </Box>
            </ImageBackground>
        </Container>
    )
}