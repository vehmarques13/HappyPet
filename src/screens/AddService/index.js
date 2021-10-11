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
    const [descriptionField, setDescriptionField] = useState('');
    const [refreshing, setRefreshing] = useState(false);

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
                        <Title>Adicionar Serviço</Title>

                        <Form>
                            <InputText>Nome *</InputText>
                            <SignInput
                                value={nameField}
                                onChangeText={o => setNameField(o)}
                            />

                            <InputText>Descrição *</InputText>
                            <SignInput
                                value={descriptionField}
                                onChangeText={o => setDescriptionField(o)}
                                password={false}
                                keyboardType={'numeric'}
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