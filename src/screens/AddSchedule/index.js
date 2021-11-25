import React, { useState, useEffect } from 'react';
import { Container, Scroller, HeaderArea, HeaderTitle, Name, PageBody, Box, Title, Form, InputText, ButtonArea, ButtonArea2, CustomButton, CustomButtonText, CustomButtonNo, CustomButtonTextNo, BackButton } from './styles';
import { RefreshControl, ImageBackground, Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-community/async-storage';

import BackIcon from '../../images/back.svg';

import SignInput from '../../components/SignInput';
import Api from '../../Api';

export default () => {
    const navigation = useNavigation();

    const [nameField, setNameField] = useState('');
    const [isSelectedTipoServico, setSelectedTipoServico] = useState(0);
    const [dateField, setDateField] = useState(new Date());
    const [refreshing, setRefreshing] = useState(false);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");

    const handleSignClick = async () => {
        if (nameField != '') {
            let email = await AsyncStorage.getItem('email');
            let res = await Api.postSchedule(email, nameField, "oi", isSelectedTipoServico, dateField, "oi");

            if (res.data != null) {
                alert("Agenda cadastrada com sucesso!");

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

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateField;
        setShow(Platform.OS === 'ios');
        setDateField(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

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
                        <Title>Adicionar Agenda</Title>

                        <Form>
                            <InputText>Nome do Tutor</InputText>
                            <SignInput
                                value={nameField}
                                onChangeText={o => setNameField(o)}
                            />

                            <InputText>Tipos do serviço</InputText>
                            <Picker
                                selectedValue={isSelectedTipoServico}
                                style={{ height: 30, width: '100%', marginTop: 8 }}
                                onValueChange={(itemValue, itemIndex) => setSelectedTipoServico(itemValue)}
                            >
                                <Picker.Item label="Veterinário" value={0} />
                                <Picker.Item label="Banho e Tosa" value={1} />
                                <Picker.Item label="Passeio" value={2} />
                                <Picker.Item label="Adestramento" value={3} />
                                <Picker.Item label="Pet Sitter" value={4} />
                                <Picker.Item label="Hospedagem" value={5} />
                            </Picker>

                            <InputText>Dia e Hora</InputText>
                            <ButtonArea2 styles={{marginTop: 0}}>
                                <CustomButtonNo onPress={showDatepicker}>
                                    <CustomButtonTextNo>Agendar Dia</CustomButtonTextNo>
                                </CustomButtonNo>
                                <CustomButton onPress={showTimepicker}>
                                    <CustomButtonText>Agendar Hora</CustomButtonText>
                                </CustomButton>
                            </ButtonArea2>

                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={dateField}
                                    mode={mode}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                />
                            )}

                            <ButtonArea>
                                <CustomButtonNo onPress={handleBackClick}>
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