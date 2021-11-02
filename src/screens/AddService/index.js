import React, { useState } from 'react';
import { Container, Scroller, HeaderArea, HeaderTitle, PageBody, Box, Title, Form, InputText, ButtonArea, CheckBoxArea, CheckBoxOption, CheckBoxText, CustomButton, CustomButtonText, CustomButtonNo, CustomButtonTextNo, BackButton, ImageArea } from './styles';
import { RefreshControl, ImageBackground, FlatList, Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';

import { launchImageLibrary } from 'react-native-image-picker';

import Add from '../../images/add.svg';
import BackIcon from '../../images/back.svg';

import SignInput from '../../components/SignInput';
import Api from '../../Api';
import ButtonImage from '../../components/ButtonImage';

export default () => {

    const navigation = useNavigation();

    const [nameField, setNameField] = useState('');
    const [descriptionField, setDescriptionField] = useState('');
    const [priceField, setPriceField] = useState(0);
    const [isSelectedTipoServico, setSelectedTipoServico] = useState(0);
    const [isSelectedPequeno, setSelectedPequeno] = useState(false);
    const [isSelectedMedio, setSelectedMedio] = useState(false);
    const [isSelectedGrande, setSelectedGrande] = useState(false);
    const [isSelectedSegunda, setSelectedSegunda] = useState(false);
    const [isSelectedTerca, setSelectedTerca] = useState(false);
    const [isSelectedQuarta, setSelectedQuarta] = useState(false); 
    const [isSelectedQuinta, setSelectedQuinta] = useState(false);
    const [isSelectedSexta, setSelectedSexta] = useState(false);
    const [isSelectedSabado, setSelectedSabado] = useState(false);
    const [isSelectedFemea, setSelectedFemea] = useState(false);
    const [isSelectedMacho, setSelectedMacho] = useState(false);
    const [isSelectedRoedores, setSelectedRoedores] = useState(false);
    const [isSelectedPassaros, setSelectedPassaros] = useState(false); 
    const [isSelectedFelinos, setSelectedFelinos] = useState(false);
    const [isSelectedCaninos, setSelectedCaninos] = useState(false); 
    const [isSelectedMedicacaoOral, setSelectedMedicacaoOral] = useState(false); 
    const [isSelectedMedicacaoInjetavel, setSelectedMedicacaoInjetavel] = useState(false);
    const [isSelectedCurativo, setSelectedCurativo] = useState(false);
    const [filterField, setFilterField] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const handleSignClick = async () => {
        if (nameField != '' && descriptionField != '' && priceField != '') {
            let json = await Api.postServices(emailField, isSelectedTipoServico, descriptionField, priceField, imageField, filterField);

            if (json.data != null) {
                console.log("DEU CERTO");
            } else {
                alert('Algo deu errado!');
            }
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
                        <Title>Adicionar Serviço</Title>

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

                            <InputText>Preço médio</InputText>
                            <SignInput
                                value={priceField}
                                onChangeText={o => setPriceField(o)}
                                keyboardType={'numeric'}
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

                            <InputText>Porte</InputText>
                            <CheckBoxArea>
                                <CheckBoxOption>
                                    <CheckBox
                                        value={isSelectedPequeno}
                                        onValueChange={setSelectedPequeno}
                                    />
                                    <CheckBoxText>Pequeno</CheckBoxText>
                                </CheckBoxOption>

                                <CheckBoxOption>
                                    <CheckBox
                                        value={isSelectedMedio}
                                        onValueChange={setSelectedMedio}
                                    />
                                    <CheckBoxText>Médio</CheckBoxText>
                                </CheckBoxOption>

                                <CheckBoxOption>
                                    <CheckBox
                                        value={isSelectedGrande}
                                        onValueChange={setSelectedGrande}
                                    />
                                    <CheckBoxText>Grande</CheckBoxText>
                                </CheckBoxOption>
                            </CheckBoxArea>

                            <InputText>Sexo</InputText>
                            <CheckBoxArea>
                                <CheckBoxOption>
                                    <CheckBox
                                        value={isSelectedFemea}
                                        onValueChange={setSelectedFemea}
                                    />
                                    <CheckBoxText>Fêmea</CheckBoxText>
                                </CheckBoxOption>

                                <CheckBoxOption>
                                    <CheckBox
                                        value={isSelectedMacho}
                                        onValueChange={setSelectedMacho}
                                    />
                                    <CheckBoxText>Macho</CheckBoxText>
                                </CheckBoxOption>
                            </CheckBoxArea>

                            <InputText>Tipos de pets</InputText>
                            <CheckBoxArea>
                                <CheckBoxOption>
                                    <CheckBox
                                        value={isSelectedRoedores}
                                        onValueChange={setSelectedRoedores}
                                    />
                                    <CheckBoxText>Roedores</CheckBoxText>
                                </CheckBoxOption>

                                <CheckBoxOption>
                                    <CheckBox
                                        value={isSelectedPassaros}
                                        onValueChange={setSelectedPassaros}
                                    />
                                    <CheckBoxText>Pássaros</CheckBoxText>
                                </CheckBoxOption>

                                <CheckBoxOption>
                                    <CheckBox
                                        value={isSelectedFelinos}
                                        onValueChange={setSelectedFelinos}
                                    />
                                    <CheckBoxText>Felinos</CheckBoxText>
                                </CheckBoxOption>

                                <CheckBoxOption>
                                    <CheckBox
                                        value={isSelectedCaninos}
                                        onValueChange={setSelectedCaninos}
                                    />
                                    <CheckBoxText>Caninos</CheckBoxText>
                                </CheckBoxOption>
                            </CheckBoxArea>

                            <InputText>Dias da semana</InputText>
                            <CheckBoxArea>
                                <CheckBoxOption>
                                    <CheckBox
                                        value={isSelectedSegunda}
                                        onValueChange={setSelectedSegunda}
                                    />
                                    <CheckBoxText>Segunda-feira</CheckBoxText>
                                </CheckBoxOption>

                                <CheckBoxOption>
                                    <CheckBox
                                        value={isSelectedTerca}
                                        onValueChange={setSelectedTerca}
                                    />
                                    <CheckBoxText>Terça-feira</CheckBoxText>
                                </CheckBoxOption>

                                <CheckBoxOption>
                                    <CheckBox
                                        value={isSelectedQuarta}
                                        onValueChange={setSelectedQuarta}
                                    />
                                    <CheckBoxText>Quarta-feira</CheckBoxText>
                                </CheckBoxOption>

                                <CheckBoxOption>
                                    <CheckBox
                                        value={isSelectedQuinta}
                                        onValueChange={setSelectedQuinta}
                                    />
                                    <CheckBoxText>Quinta-feira</CheckBoxText>
                                </CheckBoxOption>

                                <CheckBoxOption>
                                    <CheckBox
                                        value={isSelectedSexta}
                                        onValueChange={setSelectedSexta}
                                    />
                                    <CheckBoxText>Sexta-feira</CheckBoxText>
                                </CheckBoxOption>

                                <CheckBoxOption>
                                    <CheckBox
                                        value={isSelectedSabado}
                                        onValueChange={setSelectedSabado}
                                    />
                                    <CheckBoxText>Sábado</CheckBoxText>
                                </CheckBoxOption>
                            </CheckBoxArea>

                            <InputText>Medicação oral</InputText>
                            <Picker
                                selectedValue={isSelectedMedicacaoOral}
                                style={{ height: 30, width: '100%', marginTop: 8 }}
                                onValueChange={(itemValue, itemIndex) => setSelectedMedicacaoOral(itemValue)}
                            >
                                <Picker.Item label="Sim" value="true" />
                                <Picker.Item label="Não" value="false" />
                            </Picker>

                            <InputText>Medicação injetável</InputText>
                            <Picker
                                selectedValue={isSelectedMedicacaoInjetavel}
                                style={{ height: 30, width: '100%', marginTop: 8 }}
                                onValueChange={(itemValue, itemIndex) => setSelectedMedicacaoInjetavel(itemValue)}
                            >
                                <Picker.Item label="Sim" value="true" />
                                <Picker.Item label="Não" value="false" />
                            </Picker>

                            <InputText>Curativo</InputText>
                            <Picker
                                selectedValue={isSelectedCurativo}
                                style={{ height: 30, width: '100%', marginTop: 8 }}
                                onValueChange={(itemValue, itemIndex) => setSelectedCurativo(itemValue)}
                            >
                                <Picker.Item label="Sim" value="true" />
                                <Picker.Item label="Não" value="false" />
                            </Picker>
{/* 
                            <InputText>Anexos</InputText>
                            <FlatList 
                                horizontal
                                pagingEnabled={true}
                                showsHorizontalScrollIndicator={false}
                                legacyImplementation={false}
                                data={imageField}
                                keyExtractor={(item) => item.id}
                                renderItem={ ({item}) => 
                                <ImageArea>
                                    <ButtonImage onPress={() => launchImageLibrary({}, imagePickerCallBack)}> 
                                        <Add width="23" height="23" fill="rgba(219, 219, 219, 0.9)"/>
                                    </ButtonImage>
                                </ImageArea>}
                            />
                           <ImageArea>
                                <ButtonImage onPress={() => launchImageLibrary({}, imagePickerCallBack)}> 
                                    <Add width="23" height="23" fill="rgba(219, 219, 219, 0.9)"/>
                                </ButtonImage>
                            </ImageArea> */}

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