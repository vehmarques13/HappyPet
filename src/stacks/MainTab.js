import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeServiceProvider from '../screens/Home/ServiceProvider';
import HomeTutor from '../screens/Home/Tutor';
import AccountServiceProvider from '../screens/Account/ServiceProvider';
import AccountTutor from '../screens/Account/Tutor';
import Favorites from '../screens/Favorites';
import Schedule from '../screens/Schedule';

import CustomTabBar from '../components/CustomTabBar';

import AsyncStorage from '@react-native-community/async-storage';

const Tab = createBottomTabNavigator();

export default () => {

    const [userInfo, setUserInfo] = useState('');

    const tipoUsuario = async () => {
        let tipoUsuario = await AsyncStorage.getItem('tipoUsuario');
        setUserInfo(tipoUsuario);
    }

    useEffect(() => {
        tipoUsuario();
    }, []);

    return (
        <Tab.Navigator 
            tabBar={props=><CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false
            }}
        >
            {userInfo == "1" ?
                <Tab.Screen name="HomeTutor" component={HomeTutor} />
            : <Tab.Screen name="HomeServiceProvider" component={HomeServiceProvider} />
            }
            {userInfo == "1" ?
                <Tab.Screen name="Favorites" component={Favorites} />
            : <Tab.Screen name="Schedule" component={Schedule} />
            }
            {userInfo == "1" ?
                <Tab.Screen name="AccountTutor" component={AccountTutor} />
            : <Tab.Screen name="AccountServiceProvider" component={AccountServiceProvider} />
            }
        </Tab.Navigator>
    )
}
