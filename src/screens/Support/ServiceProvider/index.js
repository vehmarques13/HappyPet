import React from 'react';
import { ImageBackground } from 'react-native';
import { Container, Name, Box, Title, Form, CustomButton, CustomButtonText, CustomButtonNo, CustomButtonTextNo } from './styles';

import { useNavigation } from '@react-navigation/native';

export default () => {

    const navigation = useNavigation();

    const handleClick = async () => {
        navigation.navigate('AddService');
    }

    const handleNoClick = async () => {
        navigation.reset({
            routes:[{name: 'MainTab'}]
        });
    }

    return (
        <Container>
            <ImageBackground 
                source={require('../../../images/fundo.png')} 
                resizeMode="cover" 
                style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}  
            >
            <Name>HAPPY PET</Name>

            <Box>
                <Title>Você gostaria de adicionar algum serviço?</Title>
                
                <Form>
                    <CustomButton onPress={handleClick}>
                        <CustomButtonText>Sim</CustomButtonText>
                    </CustomButton>
                    <CustomButtonNo onPress={handleNoClick}>
                        <CustomButtonTextNo>Mais tarde</CustomButtonTextNo>
                    </CustomButtonNo>
                </Form>
            </Box>
            </ImageBackground>
        </Container>
    )
}