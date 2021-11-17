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
    const [descriptionField, setDescriptionField] = useState('');
    const [linkField, setLinkField] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [isSelectedType, setSelectedType] = useState("Serviço");

    const handleSignClick = async () => {
        if (nameField != '' && descriptionField != '' && linkField != '') {
            var json = {
                "experiencias": [
                    {
                        "tipoExperiencia": isSelectedType,
                        "links": [
                            linkField,
                        ],
                        "imagens": null,
                        "titulo": nameField,
                        "descricao": descriptionField
                    }
                ]
            };

            let email = await AsyncStorage.getItem('email');
            let res = await Api.postUserInformation(email, json);

            if (res.data != null) {
                alert("Experiência cadastrada com sucesso!");

                navigation.reset({
                    routes:[{name: 'AccountServiceProvider'}]
                });
            } else {
                alert('Algo deu errado!');
            }
        } else {
            alert('Preencha os campos!');
        }
    }

    const onRefresh = () => {
        setRefreshing(true); 
    }

    const handleBackClick = () => {
        navigation.reset({
            routes:[{name: 'MainTab'}]
        });
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
                    <BackButton onPress={handleBackClick}>
                        <BackIcon width="40" height="40" fill="#1C263F" />
                    </BackButton>
                    <HeaderTitle>HAPPY PET</HeaderTitle>
                </HeaderArea>

                <PageBody>
                    <Box>
                        <Title>Adicionar Experiência</Title>

                        <Form>
                            <InputText>Tipo de experiência *</InputText>
                            <Picker
                                selectedValue={isSelectedType}
                                style={{ height: 30, width: '100%', marginTop: 8 }}
                                onValueChange={(itemValue, itemIndex) => setSelectedType(itemValue)}
                            >
                                <Picker.Item label="Serviço" value={"Serviço"} />
                                <Picker.Item label="Certificado" value={"Certificado"} />
                            </Picker>

                            <InputText>Título</InputText>
                            <SignInput
                                value={nameField}
                                onChangeText={o => setNameField(o)}
                            />

                            <InputText>Descrição</InputText>
                            <SignInput
                                value={descriptionField}
                                onChangeText={o => setDescriptionField(o)}
                            />

                            <InputText>Link</InputText>
                            <SignInput
                                value={linkField}
                                onChangeText={o => setLinkField(o)}
                            />

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