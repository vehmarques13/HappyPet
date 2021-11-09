import React, { useState } from 'react';
import { Text, ImageBackground, Picker } from 'react-native';
import { Container, Scroller, Name, Box, Title, Subtitle, Form, InputText, CustomButton, CustomButtonText, ButtonArea, CustomButtonNo, CustomButtonTextNo } from './styles';
import SignInput from '../../../components/SignInput';
import Api from '../../../Api';
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-datepicker';

export default () => {

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
    const [informationField, setInformationField] = useState(null);

    const handleSignClick = async () => {
        if (emailField != '' && passwordField != '' && nameField != '' && birthField != '', addressField != '' && stateField != '' && cityField != '' && cellphoneField != '') { 
            let res = await Api.signUp(emailField, 1, imageField, nameField, passwordField, birthField, addressField, cellphoneField, isSelectedSexo, stateField, cityField, informationField);

            if (res.data != null) {
                navigation.reset({
                    routes: [{name: 'SupportTutor'}]
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
                        <DatePicker
                            style={{width: 200}}
                            date={birthField}
                            mode="date"
                            placeholder="Selecione uma data"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    right: 0,
                                    top: 4,
                                    marginRight: 0
                                },
                                dateInput: {
                                    marginRight: 36
                                }
                            }}
                            onDateChange={(date) => {setBirthField(date)}}
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
                            <CustomButtonNo onPress={ () => navigation.goBack() }>
                                <CustomButtonTextNo>Voltar</CustomButtonTextNo>
                            </CustomButtonNo>
                            <CustomButton onPress={handleSignClick}>
                                <CustomButtonText>Cadastro</CustomButtonText>
                            </CustomButton>
                        </ButtonArea>
                    </Form>
                </Box>
                </ImageBackground>
            </Scroller>
        </Container>
    )
}