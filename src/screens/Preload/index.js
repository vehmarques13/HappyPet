import React, { useContext, useEffect } from 'react';
import { Text, ImageBackground } from 'react-native';
import { Container, LoadingIcon } from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../contexts/UserContext';

export default () => {

    const { dispatch: useDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');

            if (token !== null) {
                //validar token
            } else {
                navigation.navigate('SignIn');
            }
        }

        checkToken();
    }, []);

    return (
        <Container>
            <ImageBackground 
                source={require('../../images/fundo.png')} 
                resizeMode="cover" 
                style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} 
            >
                <Text
                    style={{fontSize: 35, fontWeight: 'bold', lineHeight: 34, color: '#20283D'}}
                >
                    HAPPY PET
                </Text>
                <LoadingIcon 
                    size='large'
                    color='#20283D'
                />
            </ImageBackground>
        </Container>
    )
}