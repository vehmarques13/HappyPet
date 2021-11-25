import React, { useState, useEffect } from 'react';
import { Container, Scroller, HeaderArea, HeaderTitle, Name, PageBody, Box, Title, Form, InputText, ButtonArea, CustomButton, CustomButtonText, CustomButtonNo, CustomButtonTextNo, BackButton } from './styles';
import { RefreshControl, ImageBackground, Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-community/async-storage';

import BackIcon from '../../images/back.svg';

import SignInput from '../../components/SignInput';
import Api from '../../Api';

export default ({route}) => {

    const navigation = useNavigation();

    let userInfo = route.params?.userInfo;

    const [nameField, setNameField] = useState(userInfo.nome);
    const [birthField, setBirthField] = useState(userInfo.nascimento);
    const [addressField, setAddressField] = useState(userInfo.endereco);
    const [stateField, setStateField] = useState('São Paulo');
    const [cityField, setCityField] = useState(userInfo.cidade);
    const [cellphoneField, setCellphoneField] = useState(userInfo.telefone);
    const [isSelectedSexo, setSelectedSexo] = useState(userInfo.genero);
    const [refreshing, setRefreshing] = useState(false);
    const [name, setName] = useState("");

    const handleSignClick = async () => {
        if (nameField != '' && addressField != '' && cellphoneField != '') {
            let res = await Api.putUser(userInfo.email, userInfo.tipoUsuario, " ", nameField, birthField, addressField, cellphoneField, isSelectedSexo, stateField, cityField);

            if (res.data != null) {
                alert("Conta editada com sucesso!");

                navigation.reset({
                    routes:[{name: 'MainTab'}]
                });
            } else 
                alert('Algo deu errado!');
        } else 
            alert('Preencha os campos corretamente!');
    }

    const onRefresh = () => {
        setRefreshing(true); 
    }

    const handleBackClick = () => {
        navigation.reset({
            routes:[{name: 'MainTab'}]
        });
    }

    const pegarNome = async () => {
        setName(await AsyncStorage.getItem('nome'));
    }

    useEffect(() => {
        pegarNome();
    }, []);

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
                    <BackButton onPress={handleBackClick}>
                        <BackIcon width="40" height="40" fill="#1C263F" />
                    </BackButton>
                    <HeaderTitle>HAPPY PET</HeaderTitle>
                    <Name>Olá, {name.substring(0, name.indexOf(' ') == -1 ? name.length : name.indexOf(' '))}!</Name>
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