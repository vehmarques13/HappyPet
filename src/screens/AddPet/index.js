import React, { useState } from 'react';
import { Container, Scroller, HeaderArea, HeaderTitle, PageBody, Box, Title, Form, InputText, GenreArea, GenreOption, GenreText, ButtonArea, CustomButton, CustomButtonText, CustomButtonNo, CustomButtonTextNo, BackButton } from './styles';
import { RefreshControl, ImageBackground, FlatList } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';

import BackIcon from '../../images/back.svg';

import SignInput from '../../components/SignInput';
import Api from '../../Api';
import ButtonImage from '../../components/ButtonImage';

export default () => {
    const navigation = useNavigation();

    const [nameField, setNameField] = useState('');
    const [breedField, setBreedField] = useState('');
    const [sizeField, setSizeField] = useState('');
    const [birthField, setBirthField] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [isSelectedFemea, setSelectedFemea] = useState(false);
    const [isSelectedMacho, setSelectedMacho] = useState(false);

    const handleSignClick = async () => {
        if (nameField != '' && birthField != '') {
            let json = await Api.signIn(nameField, birthField);
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
                        <Title>Adicionar Pet</Title>

                        <Form>
                            <InputText>Nome *</InputText>
                            <SignInput
                                value={nameField}
                                onChangeText={o => setNameField(o)}
                            />

                            <InputText>Raça</InputText>
                            <SignInput
                                value={breedField}
                                onChangeText={o => setBreedField(o)}
                            />

                            <InputText>Porte</InputText>
                            <SignInput
                                value={sizeField}
                                onChangeText={o => setSizeField(o)}
                            />

                            <InputText>Data de nascimento *</InputText>
                            <SignInput
                                value={birthField}
                                onChangeText={o => setBirthField(o)}
                                password={false}
                                keyboardType={'numeric'}
                            />

                            <InputText>Sexo *</InputText>
                            <GenreArea>
                                <GenreOption>
                                    <CheckBox
                                        value={isSelectedFemea}
                                        onValueChange={setSelectedFemea}
                                    />
                                    <GenreText>Fêmea</GenreText>
                                </GenreOption>

                                <GenreOption>
                                    <CheckBox
                                        value={isSelectedMacho}
                                        onValueChange={setSelectedMacho}
                                    />
                                    <GenreText>Macho</GenreText>
                                </GenreOption>
                            </GenreArea>

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