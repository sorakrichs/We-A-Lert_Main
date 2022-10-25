import React from 'react';
import {Animated} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Phone from './page/Phone'
import OTP from './page/OTP'
import ChangePassword from './page/ChangePassword'
import 'react-native-gesture-handler';
const Stack = createStackNavigator();

export default ForgotPassword = () => {


    return (

        <Stack.Navigator initialRouteName="Phone" screenOptions={{gestureEnabled:true, headerShown: false }}>
            <Stack.Screen name="Phone" component={Phone} />
            <Stack.Screen name="OTP" component={OTP} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
        </Stack.Navigator>
        
    );
};