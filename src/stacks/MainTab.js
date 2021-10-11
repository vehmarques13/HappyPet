import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeTutor from '../screens/Home/Tutor';
import AccountServiceProvider from '../screens/Account/ServiceProvider';
import Favorites from '../screens/Favorites';
import Schedule from '../screens/Schedule';

import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

export default () => (
    <Tab.Navigator 
        tabBar={props=><CustomTabBar {...props} />}
        screenOptions={{
            headerShown: false
        }}
    >
        <Tab.Screen name="HomeTutor" component={HomeTutor} />
        <Tab.Screen name="Favorites" component={Favorites} />
        <Tab.Screen name="Schedule" component={Schedule} />
        <Tab.Screen name="AccountServiceProvider" component={AccountServiceProvider} />
        
    </Tab.Navigator>
)
