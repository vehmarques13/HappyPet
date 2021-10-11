import React, { useState } from 'react';
import { Container, Scroller, HeaderArea, HeaderTitle, PageBody, Box, Title, Form, InputText, ButtonArea, CustomButton, CustomButtonText, CustomButtonNo, CustomButtonTextNo, BackButton, ExperienceArea, ExperienceOption, ExperienceText } from './styles';
import { RefreshControl, ImageBackground, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';

import BackIcon from '../../images/back.svg';

import SignInput from '../../components/SignInput';
import Api from '../../Api';
import ButtonImage from '../../components/ButtonImage';

export default () => {

    const navigation = useNavigation();

    const [nameField, setNameField] = useState('');
    const [descriptionField, setDescriptionField] = useState('');
    const [yearField, setYearField] = useState('');
    const [localField, setLocalField] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const [isSelectedWork, setSelectedWork] = useState(false);
    const [isSelectedCertification, setSelectedCertification] = useState(false);

    const handleSignClick = async () => {
        if (nameField != '' && descriptionField != '') {
            let json = await Api.signIn(nameField, descriptionField);
        } else {
            alert('Preencha os campos!');
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
                        <Title>Adicionar Experiência</Title>

                        <Form>
                            <InputText>Tipo de experiência *</InputText>
                            <ExperienceArea>
                                <ExperienceOption>
                                    <CheckBox
                                        value={isSelectedWork}
                                        onValueChange={setSelectedWork}
                                    />
                                    <ExperienceText>Trabalho</ExperienceText>
                                </ExperienceOption>

                                <ExperienceOption>
                                    <CheckBox
                                        value={isSelectedCertification}
                                        onValueChange={setSelectedCertification}
                                    />
                                    <ExperienceText>Certificado</ExperienceText>
                                </ExperienceOption>
                            </ExperienceArea>

                            <InputText>Nome</InputText>
                            <SignInput
                                value={nameField}
                                onChangeText={o => setNameField(o)}
                            />

                            <InputText>Descrição</InputText>
                            <SignInput
                                value={descriptionField}
                                onChangeText={o => setDescriptionField(o)}
                                keyboardType={'email-address'}
                            />

                            <InputText>Ano</InputText>
                            <SignInput
                                value={yearField}
                                onChangeText={o => setYearField(o)}
                                password={true}
                                keyboardType={'numeric'}
                            />

                            <InputText>Local</InputText>
                            <SignInput
                                value={localField}
                                onChangeText={o => setLocalField(o)}
                            />

                            <InputText>Anexos</InputText>
                            <FlatList 
                                // horizontal
                                // pagingEnabled={true}
                                // showsHorizontalScrollIndicator={false}
                                // legacyImplementation={false}
                                // data={this.state.feed}
                                // keyExtractor={(item) => item.id}
                                // renderItem={ ({item}) => <ButtonImage data={item}/>}
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