import React, { useState } from 'react';
import { ImageBackground, Text } from 'react-native';
import { Container, Name, Box, Title, Subtitle, Form, InputText, SignMessageButton, SignMessageButtonText, SignMessageButtonTextBold, CustomButton, CustomButtonText } from './styles';
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
            let res = await Api.signIn(emailField, passwordField);

            if (res.data != null) {
                let tipoUsuario = await (res.data.tipoUsuario).toString();

                await AsyncStorage.setItem('email', res.data.email);
                await AsyncStorage.setItem('nome', res.data.nome);
                await AsyncStorage.setItem('tipoUsuario', tipoUsuario);
                
                navigation.reset({
                    routes: [{name: 'MainTab'}]
                });
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

                    <SignMessageButton>
                        <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                        <SignMessageButtonTextBold onPress={handleMessageButtonClick}>
                            <Text style={{ fontSize: 12.5, marginLeft: 5, fontWeight: 'bold'}}>Cadastre-se.</Text>
                        </SignMessageButtonTextBold>
                    </SignMessageButton>

                    <CustomButton onPress={handleSignClick}>
                        <CustomButtonText>Login</CustomButtonText>
                    </CustomButton>

                    {/* <SignMessageError></SignMessageError> */}
                </Form>
            </Box>
            </ImageBackground>
        </Container>
    )
}