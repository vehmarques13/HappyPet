import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import { Container, Name, Box, Title, Subtitle, Form, InputText, SignMessageButton, SignMessageButtonText, SignMessageButtonTextBold, CustomButton, CustomButtonText, SignMessageError } from './styles';
import SignInput from '../../components/SignInput';
import Api from '../../Api';
import { useNavigation } from '@react-navigation/native';
import { userContext } from '../../contexts/UserContext';
import AsyncStorage from '@react-native-community/async-storage';

export default () => {

    // const { dispatch: userDispatch } = userContext(userContext);
    const navigation = useNavigation();

    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const handleSignClick = async () => {
        if (emailField != '' && passwordField != '') {
            navigation.reset({
                routes: [{name: 'SupportTutor'}]
            });

            let json = await Api.signIn(emailField, passwordField);

            if (json.token) {
                await AsyncStorage.setItem('token', json.token);

                userDispatch({
                    type: 'setAvatar', 
                    payload: {
                        avatar: json.data.avatar
                    }
                });

                navigation.reset({
                    routes: [{name: 'MainTab'}]
                });
            } else {
                alert('Email e/ou senha inválido!');
            }
        } else {
            alert('Preencha os campos!');
        }
    }

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{name: 'SignUp'}]
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
                <Subtitle>Faça o login para entrar</Subtitle>

                <Form>
                    <InputText>Email *</InputText>
                    <SignInput
                        value={emailField}
                        onChangeText={o => setEmailField(o)}
                        keyboardType={'email-address'}
                    />

                    <InputText>Senha *</InputText>
                    <SignInput
                        value={passwordField}
                        onChangeText={o => setPasswordField(o)}
                        password={true}
                    />

                    <SignMessageButton onPress={handleMessageButtonClick}>
                        <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                        <SignMessageButtonTextBold>Cadastre-se.</SignMessageButtonTextBold>
                    </SignMessageButton>

                    <CustomButton onPress={handleSignClick}>
                        <CustomButtonText>LOGIN</CustomButtonText>
                    </CustomButton>

                    {/* <SignMessageError></SignMessageError> */}
                </Form>
            </Box>
            </ImageBackground>
        </Container>
    )
}