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
    const [stateField, setStateField] = useState('');
    const [cityField, setCityField] = useState('');
    const [cellphoneField, setCellphoneField] = useState('');
    const [imageField, setImageField] = useState('');
    const [isSelectedSexo, setSelectedSexo] = useState('Feminino');
    const [informationField, setInformationField] = useState([]);

    const handleSignClick = async () => {
        if (emailField != '' && passwordField != '' && nameField != '' && birthField != '', addressField != '' && stateField != '' && cityField != '' && cellphoneField != '') { 

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

                        <ButtonArea>
                            <CustomButtonNo onPress={() => navigation.goBack()}>
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