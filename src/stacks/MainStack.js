import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Preload from '../screens/Preload';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import SignUpTutor from '../screens/SignUp/Tutor';
import SignUpServiceProvider from '../screens/SignUp/ServiceProvider';
import MainTab from '../stacks/MainTab';
import SupportTutor from '../screens/Support/Tutor';
import SupportServiceProvider from '../screens/Support/ServiceProvider';
import Service from '../screens/Service';
import AddPet from '../screens/AddPet';
import AddService from '../screens/AddService';
import EditAccount from '../screens/EditAccount';
import AddExperience from '../screens/AddExperience';
import Rating from '../screens/Rating';
import AccountId from '../screens/Account/Id';

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="MainTab" component={MainTab} />
        <Stack.Screen name="Preload" component={Preload} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignUpTutor" component={SignUpTutor} />
        <Stack.Screen name="SignUpServiceProvider" component={SignUpServiceProvider} />
        <Stack.Screen name="SupportTutor" component={SupportTutor} />
        <Stack.Screen name="SupportServiceProvider" component={SupportServiceProvider} />
        <Stack.Screen name="Service" component={Service} />
        <Stack.Screen name="AddPet" component={AddPet} />
        <Stack.Screen name="AddService" component={AddService} />
        <Stack.Screen name="EditAccount" component={EditAccount} />
        <Stack.Screen name="AddExperience" component={AddExperience} />
        <Stack.Screen name="Rating" component={Rating} />
        <Stack.Screen name="AccountId" component={AccountId} />
    </Stack.Navigator>
);