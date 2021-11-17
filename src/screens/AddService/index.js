import React, { useState } from 'react';
import { Container, Scroller, HeaderArea, HeaderTitle, PageBody, Box, Title, Form, InputText, ButtonArea, CheckBoxArea, CheckBoxOption, CheckBoxText, CustomButton, CustomButtonText, CustomButtonNo, CustomButtonTextNo, BackButton } from './styles';
import { RefreshControl, ImageBackground,  Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox'; 
import AsyncStorage from '@react-native-community/async-storage';

import BackIcon from '../../images/back.svg';

import SignInput from '../../components/SignInput';
import Api from '../../Api';

export default () => {
    const [descriptionField, setDescriptionField] = useState('');
    const [priceField, setPriceField] = useState("0");
    const [isSelectedTipoServico, setSelectedTipoServico] = useState("0");
    const [isSelectedPorte, setSelectedPorte] = useState([{"id": 0, "valueItem": 'Pequeno', "checked": true}, {"id": 1, "valueItem": 'Médio', "checked": false}, {"id": 2, "valueItem": 'Grande', "checked": false}]);
    const [isSelectedSexo, setSelectedSexo] = useState([{"id": 0, "valueItem": 'Fêmea', "checked": true}, {"id": 1, "valueItem": 'Macho', "checked": false}]);
    const [isSelectedTipoPet, setSelectedTipoPet] = useState([{"id": 0, "valueItem": 'Roedor', "checked": true}, {"id": 2, "valueItem": 'Pássaro', "checked": false}, {"id": 3, "valueItem": 'Felino', "checked": false}, {"id": 4, "valueItem": 'Canino', "checked": false}]);
    const [isSelectedMedicacaoOral, setSelectedMedicacaoOral] = useState(false); 
    const [isSelectedMedicacaoInjetavel, setSelectedMedicacaoInjetavel] = useState(false);
    const [isSelectedCurativo, setSelectedCurativo] = useState(false);
    const [filterField, setFilterField] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const navigation = useNavigation();

    const handleSignClick = async () => {
        if (descriptionField != '' && priceField != '') {
            var json = {
                "pesos": isSelectedPorte.filter(x => x.checked == true).map(m => m.valueItem),
                "generos": isSelectedSexo.filter(x => x.checked == true).map(m => m.valueItem),
                "tiposPet": isSelectedTipoPet.filter(x => x.checked == true).map(m => m.valueItem),
                "diasSemana": null,
                "medicacaoOral": isSelectedMedicacaoOral,
                "medicacaoInjetavel": isSelectedMedicacaoInjetavel,
                "curativo": isSelectedCurativo
            };

            let email = await AsyncStorage.getItem('email');
            let res = await Api.postServices(email, parseInt(isSelectedTipoServico), descriptionField, parseFloat(priceField), {}, json);

            if (res.status != 200) {
                alert("Serviço cadastrado com sucesso!");

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
    
    const onCheckChangedPorte = (id) => {
        const data = isSelectedPorte;

        const index = data.findIndex(x => x.id === id);
        data[index].checked = !data[index].checked;
        setSelectedPorte(data);
    }

    const onCheckChangedSexo = (id) => {
        const data = isSelectedSexo;

        const index = data.findIndex(x => x.id === id);
        data[index].checked = !data[index].checked;
        setSelectedSexo(data);
    }

    const onCheckChangedTipoPet = (id) => {
        const data = isSelectedTipoPet;

        const index = data.findIndex(x => x.id === id);
        data[index].checked = !data[index].checked;
        setSelectedTipoPet(data);
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
                        <Title>Adicionar Serviço</Title>

                        <Form>
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
                                <Picker.Item label="Veterinário" value={"0"} />
                                <Picker.Item label="Banho e Tosa" value={"1"} />
                                <Picker.Item label="Passeio" value={"2"} />
                                <Picker.Item label="Adestramento" value={"3"} />
                                <Picker.Item label="Pet Sitter" value={"4"} />
                                <Picker.Item label="Hospedagem" value={"5"} />
                            </Picker>

                            
                            <InputText>Porte</InputText>
                            {isSelectedPorte.map((item,key) =>
                                <CheckBoxArea>
                                    <CheckBoxOption>
                                        <CheckBox value={item.checked} onValueChange={() => onCheckChangedPorte(item.id)} />
                                        <CheckBoxText>{item.valueItem}</CheckBoxText>
                                    </CheckBoxOption>      
                                </CheckBoxArea>
                            )}
                            
                            <InputText>Sexo</InputText>
                            {isSelectedSexo.map((item,key) =>
                                <CheckBoxArea>
                                    <CheckBoxOption>
                                        <CheckBox value={item.checked} onValueChange={() => onCheckChangedSexo(item.id)} />
                                        <CheckBoxText>{item.valueItem}</CheckBoxText>
                                    </CheckBoxOption>      
                                </CheckBoxArea>
                            )}
                            

                            <InputText>Tipos de pets</InputText>
                            {isSelectedTipoPet.map((item,key) =>
                                <CheckBoxArea>
                                    <CheckBoxOption>
                                        <CheckBox value={item.checked} onValueChange={() => onCheckChangedTipoPet(item.id)} />
                                        <CheckBoxText>{item.valueItem}</CheckBoxText>
                                    </CheckBoxOption>      
                                </CheckBoxArea>
                            )}

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