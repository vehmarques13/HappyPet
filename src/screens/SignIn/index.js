import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import { Container, Name, Box, Title, Subtitle, Form, InputText, SignMessageButton, SignMessageButtonText, SignMessageButtonTextBold, CustomButton, CustomButtonText, SignMessageError } from './styles';
import SignInput from '../../components/SignInput';
import Api from '../../Api';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

export default () => {
    const navigation = useNavigation();

    const [emailField, setEmailField] = useState('usuario@gmail.com');
    const [passwordField, setPasswordField] = useState('123');

    const handleSignClick = async () => {
        if (emailField != '' && passwordField != '') {
            let json = await Api.signIn(emailField, passwordField);

            if (json.data != null) {
                let tipoUsuario = await (json.data.tipoUsuario).toString();

                await AsyncStorage.setItem('email', json.data.email);
                await AsyncStorage.setItem('tipoUsuario', tipoUsuario);

                switch (json.data.tipoUsuario) {
                    case 1: 
                        navigation.reset({
                            routes: [{name: 'SupportTutor'}]
                        });
                        break;
                    case 2: 
                        navigation.reset({
                            routes: [{name: 'SupportServiceProvider'}]
                        });
                        break;
                    default: 
                        alert('Usuário inválido!');
                        break;
                }
            } else {
                alert('Algo deu errado!');
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