import React, { useState } from 'react';
import { Text, ImageBackground, Picker } from 'react-native';
import { Container, Scroller, Name, Box, Title, Subtitle, Form, InputText, CustomButton, CustomButtonText, ButtonArea, CustomButtonNo, CustomButtonTextNo } from './styles';
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
    const [stateField, setStateField] = useState('São Paulo');
    const [cityField, setCityField] = useState('Santos');
    const [cellphoneField, setCellphoneField] = useState('');
    const [imageField, setImageField] = useState('');
    const [isSelectedSexo, setSelectedSexo] = useState('Feminino');
    const [informationField, setInformationField] = useState([]);

    const handleSignClick = async () => {
        if (emailField != '' && passwordField != '' && nameField != '' && birthField != '', addressField != '' && cellphoneField != '') { 

            let res = await Api.signUp(emailField, 2, imageField, nameField, passwordField, birthField, addressField, cellphoneField, isSelectedSexo, stateField, cityField, informationField);

            if (res.data != null) {
                navigation.reset({
                    routes: [{name: 'SupportServiceProvider'}]
                });
            } else {
                alert('Algo deu errado!');
            }
        } else {
            alert('Preencha os campos!');
        }
    }

    const handleBackClick = () => {
        navigation.reset({
            routes: [{name: 'SignIn'}]
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

                        <InputText>Gênero</InputText>
                        <Picker
                            selectedValue={isSelectedSexo}
                            style={{ height: 30, width: '100%', marginTop: 8 }}
                            onValueChange={(itemValue, itemIndex) => setSelectedSexo(itemValue)}
                        >
                            <Picker.Item label="Feminino" value="Feminino" />
                            <Picker.Item label="Masculino" value="Masculino" />
                            <Picker.Item label="Outros" value="Outros" />
                        </Picker>

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
                        <Picker
                            selectedValue={isSelectedSexo}
                            style={{ height: 30, width: '100%', marginTop: 8 }}
                            onValueChange={(itemValue, itemIndex) => setStateField(itemValue)}
                        >
                            <Picker.Item label="São Paulo" value="São Paulo" />
                        </Picker>

                        <InputText>Cidade</InputText>
                        <Picker
                            selectedValue={isSelectedSexo}
                            style={{ height: 30, width: '100%', marginTop: 8 }}
                            onValueChange={(itemValue, itemIndex) => setCityField(itemValue)}
                        >
                            <Picker.Item label="Santos" value="Santos" />
                            <Picker.Item label="São Vicente" value="São Vicente" />
                            <Picker.Item label="Guarujá" value="Guarujá" />
                            <Picker.Item label="Praia Grande" value="Praia Grande" />
                            <Picker.Item label="Peruíbe" value="Peruíbe" />
                            <Picker.Item label="Mongaguá" value="Mongaguá" />
                            <Picker.Item label="Itanhaêm" value="Itanhaêm" />
                            <Picker.Item label="Bertioga" value="Bertioga" />
                            <Picker.Item label="Cubatão" value="Cubatão" />
                        </Picker>

                        <InputText>Contato</InputText>
                        <SignInput
                            value={cellphoneField}
                            onChangeText={o => setCellphoneField(o)}
                            keyboardType={'phone-pad'}
                        />

                        <ButtonArea>
                            <CustomButtonNo onPress={handleBackClick}>
                                <CustomButtonTextNo>Voltar</CustomButtonTextNo>
                            </CustomButtonNo>
                            <CustomButton onPress={handleSignClick}>
                                <CustomButtonText>Cadastro</CustomButtonText>
                            </CustomButton>
                        </ButtonArea>

                        {/* <SignMessageError></SignMessageError> */}
                    </Form>
                </Box>
                </ImageBackground>
            </Scroller>
        </Container>
    )
}