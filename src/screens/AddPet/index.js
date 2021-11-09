import React, { useState } from 'react';
import { Container, Scroller, HeaderArea, HeaderTitle, PageBody, Box, Title, Form, InputText, ButtonArea, CustomButton, CustomButtonText, CustomButtonNo, CustomButtonTextNo, BackButton } from './styles';
import { RefreshControl, ImageBackground, Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import BackIcon from '../../images/back.svg';

import SignInput from '../../components/SignInput';
import Api from '../../Api';

export default () => {
    const navigation = useNavigation();

    const [nameField, setNameField] = useState('');
    const [breedField, setBreedField] = useState('');
    const [descriptionField, setDescriptionField] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [isSelectedSexo, setSelectedSexo] = useState('femea');
    const [isSelectedTipoPet, setSelectedTipoPet] = useState(0); 
    const [isSelectedPorte, setSelectedPorte] = useState('pequeno'); 
    const [imageField, setImageField] = useState('');

    const handleSignClick = async () => {
        if (nameField != '' && descriptionField != '' && breedField != '') {
            let email = await AsyncStorage.getItem('email');
            let res = await Api.postPets(email, imageField, nameField, isSelectedTipoPet, isSelectedPorte, isSelectedSexo, breedField, descriptionField);

            if (res.data != null) {
                alert("Cadastro realizado com sucesso!");

                navigation.reset({
                    routes:[{name: 'MainTab'}]
                });
            } else {
                alert('Algo deu errado!');
            }
        } else {
            alert('Preencha os campos corretamente!');
        }
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
                    <BackButton onPress={() => navigation.goBack()}>
                        <BackIcon width="40" height="40" fill="#1C263F" />
                    </BackButton>
                    <HeaderTitle>HAPPY PET</HeaderTitle>
                </HeaderArea>

                <PageBody>
                    <Box>
                        <Title>Adicionar Pet</Title>

                        <Form>
                            <InputText>Nome</InputText>
                            <SignInput
                                value={nameField}
                                onChangeText={o => setNameField(o)}
                            />

                            <InputText>Descrição</InputText>
                            <SignInput
                                value={descriptionField}
                                onChangeText={o => setDescriptionField(o)}
                            />

                            <InputText>Raça</InputText>
                            <SignInput
                                value={breedField}
                                onChangeText={o => setBreedField(o)}
                            />

                            <InputText>Tipos de pets</InputText>
                            <Picker
                                selectedValue={isSelectedTipoPet}
                                style={{ height: 30, width: '100%', marginTop: 8 }}
                                onValueChange={(itemValue, itemIndex) => setSelectedTipoPet(itemValue)}
                            >
                                <Picker.Item label="Roedores" value={0} />
                                <Picker.Item label="Pássaros" value={2} />
                                <Picker.Item label="Felinos" value={3} />
                                <Picker.Item label="Caninos" value={4} />
                            </Picker>

                            <InputText>Sexo</InputText>
                            <Picker
                                selectedValue={isSelectedSexo}
                                style={{ height: 30, width: '100%', marginTop: 8 }}
                                onValueChange={(itemValue, itemIndex) => setSelectedSexo(itemValue)}
                            >
                                <Picker.Item label="Fêmea" value="Fêmea" />
                                <Picker.Item label="Macho" value="Macho" />
                            </Picker>

                            <InputText>Porte</InputText>
                            <Picker
                                selectedValue={isSelectedPorte}
                                style={{ height: 30, width: '100%', marginTop: 8 }}
                                onValueChange={(itemValue, itemIndex) => setSelectedPorte(itemValue)}
                            >
                                <Picker.Item label="Pequeno" value="Pequeno" />
                                <Picker.Item label="Médio" value="Médio" />
                                <Picker.Item label="Grande" value="Grande" />
                            </Picker>

                            <ButtonArea>
                                <CustomButtonNo onPress={() => navigation.goBack()}>
                                    <CustomButtonTextNo>Cancelar</CustomButtonTextNo>
                                </CustomButtonNo>
                                <CustomButton onPress={handleSignClick}>
                                    <CustomButtonText>Adicionar</CustomButtonText>
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