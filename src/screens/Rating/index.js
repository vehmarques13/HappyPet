import React, { useState } from 'react';
import { Container, Scroller, HeaderArea, HeaderTitle, PageBody, Box, Title, Form, InputText, ButtonArea, CustomButton, CustomButtonText, CustomButtonNo, CustomButtonTextNo, BackButton } from './styles';
import { RefreshControl, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import BackIcon from '../../images/back.svg';

import SignInput from '../../components/SignInput';
import Api from '../../Api';
import Stars from '../../components/Stars';

export default () => {

    const navigation = useNavigation();

    const [commentField, setCommentField] = useState('');
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
                        <Title>Adicionar Avaliação</Title>

                        <Form>
                            <InputText>Estrelas</InputText>
                            <Stars stars={2} size={38} />

                            <InputText>Comentário</InputText>
                            <SignInput
                                value={commentField}
                                onChangeText={o => setCommentField(o)}
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