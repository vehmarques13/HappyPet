import React, { useState } from 'react';
import { Container, Scroller, HeaderArea, HeaderTitle, PageBody, Box, Title, Form, InputText, ButtonArea, CustomButton, CustomButtonText, CustomButtonNo, CustomButtonTextNo, BackButton } from './styles';
import { RefreshControl, ImageBackground, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import BackIcon from '../../images/back.svg';

import SignInput from '../../components/SignInput';
import Api from '../../Api';
import ButtonImage from '../../components/ButtonImage';

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
    const [refreshing, setRefreshing] = useState(false);

    const handleSignClick = async () => {
        if (nameField != '' && descriptionField != '') {
            let json = await Api.signIn(nameField, descriptionField);
        } else {
            alert('Preencha os campos corretamente!');
        }
    }

    const handleGoBackClick = () => {
        navigation.goBack();
    }

    const onRefresh = () => {
        setRefreshing(true); 
    }

    return (
        <Container>
            <ImageBackground 
                source={require('../../images/fundo.png')} 
                resizeMode="cover" 
                style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} 
            >
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <HeaderArea>
                    <BackButton onPress={handleGoBackClick}>
                        <BackIcon width="40" height="40" fill="#1C263F" />
                    </BackButton>
                    <HeaderTitle>HAPPY PET</HeaderTitle>
                </HeaderArea>

                <PageBody>
                    <Box>
                        <Title>Editar Perfil</Title>

                        <Form>
                            <InputText>Nome</InputText>
                            <SignInput
                                value={nameField}
                                onChangeText={o => setNameField(o)}
                            />

                            <InputText>Email</InputText>
                            <SignInput
                                value={emailField}
                                onChangeText={o => setEmailField(o)}
                                keyboardType={'email-address'}
                            />

                            <InputText>Senha</InputText>
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

                            <ButtonArea>
                                <CustomButtonNo onPress={handleGoBackClick}>
                                    <CustomButtonTextNo>Cancelar</CustomButtonTextNo>
                                </CustomButtonNo>
                                <CustomButton onPress={handleSignClick}>
                                    <CustomButtonText>Editar</CustomButtonText>
                                </CustomButton>
                            </ButtonArea>
                        </Form>
                    </Box>
                </PageBody>  
            </Scroller>
            </ImageBackground> 
        </Container>
    );
}