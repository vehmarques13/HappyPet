import React, { useState } from 'react';
import { Text, ImageBackground } from 'react-native';
import { Container, Scroller, Name, Box, Title, Subtitle, Form, InputText, CustomButton, CustomButtonText, SignMessageError } from './styles';
import SignInput from '../../../components/SignInput';
import Api from '../../../Api';
import { useNavigation } from '@react-navigation/native';
import { userContext } from '../../../contexts/UserContext';
import AsyncStorage from '@react-native-community/async-storage';

export default () => {

    // const { dispatch: userDispatch } = userContext(userContext);
    const navigation = useNavigation();

    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const [birthField, setBirthField] = useState('');
    const [addressField, setAddressField] = useState('');
    const [stateField, setStateField] = useState('');
    const [cityField, setCityField] = useState('');
    const [cellphoneField, setCellphoneField] = useState('');

    const handleSignClick = async () => {
        if (nameField != '' && emailField != '' && passwordField != '') {
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
                    routes: [{name: 'SupportTutor'}]
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
            <Scroller>
                <ImageBackground 
                    source={require('../../../images/fundo.png')} 
                    resizeMode="cover" 
                    style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} 
                >
                <Name>HAPPY PET</Name>

                <Box>
                    <Title>Seja bem vindo(a)!</Title>
                    <Subtitle>Faça seu cadastro!</Subtitle>

                    <Form>
                        <InputText>Nome *</InputText>
                        <SignInput
                            value={nameField}
                            onChangeText={o => setNameField(o)}
                        />

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

                        <InputText>Data de nascimento</InputText>
                        <SignInput
                            value={birthField}
                            onChangeText={o => setBirthField(o)}
                            password={true}
                            keyboardType={'numeric'}
                        />

                        <InputText>Endereço</InputText>
                        <SignInput
                            value={addressField}
                            onChangeText={o => setAddressField(o)}
                        />

                        <InputText>Estado</InputText>
                        <SignInput
                            value={stateField}
                            onChangeText={o => setStateField(o)}
                        />

                        <InputText>Cidade</InputText>
                        <SignInput
                            value={cityField}
                            onChangeText={o => setCityField(o)}
                        />

                        <InputText>Telefone</InputText>
                        <SignInput
                            value={cellphoneField}
                            onChangeText={o => setCellphoneField(o)}
                            keyboardType={'phone-pad'}
                        />

                        <CustomButton onPress={handleSignClick}>
                            <CustomButtonText>Cadastro</CustomButtonText>
                        </CustomButton>

                        {/* <SignMessageError></SignMessageError> */}
                    </Form>
                </Box>
                </ImageBackground>
            </Scroller>
        </Container>
    )
}