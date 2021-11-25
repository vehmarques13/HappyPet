import React, { useState, useEffect } from 'react';
import { Container, Scroller, HeaderArea, HeaderTitle, Name, PageBody, Box, Title, Form, InputText, ButtonArea, CheckBoxArea, CheckBoxOption, CheckBoxText, CustomButton, CustomButtonText, CustomButtonNo, CustomButtonTextNo, BackButton } from './styles';
import { RefreshControl, ImageBackground,  Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox'; 
import AsyncStorage from '@react-native-community/async-storage';

import BackIcon from '../../images/back.svg';

import SignInput from '../../components/SignInput';
import Api from '../../Api';

export default () => {
    const navigation = useNavigation();

    const [isSelectedTipoServico, setSelectedTipoServico] = useState("Santos");
    const [isSelectedPorte, setSelectedPorte] = useState([{"id": 0, "valueItem": 'Pequeno', "checked": false}, {"id": 1, "valueItem": 'Médio', "checked": false}, {"id": 2, "valueItem": 'Grande', "checked": false}]);
    const [isSelectedSexo, setSelectedSexo] = useState([{"id": 0, "valueItem": 'Fêmea', "checked": false}, {"id": 1, "valueItem": 'Macho', "checked": false}]);
    const [isSelectedTipoPet, setSelectedTipoPet] = useState([{"id": 0, "valueItem": 'Roedor', "checked": false}, {"id": 2, "valueItem": 'Pássaro', "checked": false}, {"id": 3, "valueItem": 'Felino', "checked": false}, {"id": 4, "valueItem": 'Canino', "checked": false}]);
    const [isSelectedMedicacaoOral, setSelectedMedicacaoOral] = useState(false); 
    const [isSelectedMedicacaoInjetavel, setSelectedMedicacaoInjetavel] = useState(false);
    const [isSelectedCurativo, setSelectedCurativo] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [name, setName] = useState("");

    const handleSignClick = async () => {

        var parameters = "";

        if (isSelectedPorte.filter(x => x.checked == true).length > 0) {
            parameters += "&pesos=";
            parameters += isSelectedPorte.filter(x => x.checked == true).map(m => m.valueItem);
        }

        if (isSelectedSexo.filter(x => x.checked == true).length > 0) {
            parameters += "&generos=";
            parameters += isSelectedSexo.filter(x => x.checked == true).map(m => m.valueItem);
        }

        if (isSelectedTipoPet.filter(x => x.checked == true).length > 0) {
            parameters += "&tiposPet=";
            parameters += isSelectedTipoPet.filter(x => x.checked == true).map(m => m.valueItem);
        }

        if (isSelectedMedicacaoOral == true) {
            parameters += "&medicacaoOral=true";
        }

        if (isSelectedMedicacaoInjetavel == true) {
            parameters += "&medicacaoInjetavel=true";
        }

        if (isSelectedCurativo == true) {
            parameters += "&curativo=" + isSelectedCurativo;
        }

        parameters += "&cidade=" + isSelectedTipoServico;

        console.log(parameters);

        await AsyncStorage.setItem('rotaFiltro', parameters);

        navigation.reset({
            routes:[{name: 'Services'}]
        });
    }
    
    const pegarNome = async () => {
        setName(await AsyncStorage.getItem('nome'));
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

    const handleBackClick = async () => {
        await AsyncStorage.removeItem('rotaFiltro');

        navigation.reset({
            routes:[{name: 'Services'}]
        });
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
                        <Title>Filtrar Serviço</Title>

                        <Form>

                            <InputText>Cidade</InputText>
                            <Picker
                                selectedValue={isSelectedTipoServico}
                                style={{ height: 30, width: '100%', marginTop: 8 }}
                                onValueChange={(itemValue, itemIndex) => setSelectedTipoServico(itemValue)}
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
                                <Picker.Item label="Sim" value={true} />
                                <Picker.Item label="Não" value={false} />
                            </Picker>

                            <InputText>Medicação injetável</InputText>
                            <Picker
                                selectedValue={isSelectedMedicacaoInjetavel}
                                style={{ height: 30, width: '100%', marginTop: 8 }}
                                onValueChange={(itemValue, itemIndex) => setSelectedMedicacaoInjetavel(itemValue)}
                            >
                                <Picker.Item label="Sim" value={true} />
                                <Picker.Item label="Não" value={false} />
                            </Picker>

                            <InputText>Curativo</InputText>
                            <Picker
                                selectedValue={isSelectedCurativo}
                                style={{ height: 30, width: '100%', marginTop: 8 }}
                                onValueChange={(itemValue, itemIndex) => setSelectedCurativo(itemValue)}
                            >
                                <Picker.Item label="Sim" value={true} />
                                <Picker.Item label="Não" value={false} />
                            </Picker>

                            <ButtonArea>
                                <CustomButtonNo onPress={handleBackClick}>
                                    <CustomButtonTextNo>Limpar</CustomButtonTextNo>
                                </CustomButtonNo>
                                <CustomButton onPress={handleSignClick}>
                                    <CustomButtonText>Filtrar</CustomButtonText>
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