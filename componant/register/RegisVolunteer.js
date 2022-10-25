import React,{useEffect,useState} from 'react';
import {Animated} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import RegisOrganize from './page/RegisOrganize'
import RegisList from './page/RegisVolunteerList'
import RegisMember from './page/RegisVolunteerMember'
import RegisPhone from './page/RegisPhone'
import 'react-native-gesture-handler';
const Stack = createStackNavigator();

export default Report = () => {

    const forFade = ({ current }) => ({
        cardStyle: {
          opacity: current.progress,
        },
    });

    const forSlide = ({ current, next, inverted, layouts: { screen } }) => {
        const progress = Animated.add(
          current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          }),
          next
            ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolate: 'clamp',
              })
            : 0
        );
      
        return {
          cardStyle: {
            transform: [
              {
                translateX: Animated.multiply(
                  progress.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: [
                      screen.width, // Focused, but offscreen in the beginning
                      0, // Fully focused
                      screen.width * -0.3, // Fully unfocused
                    ],
                    extrapolate: 'clamp',
                  }),
                  inverted
                ),
              },
            ],
          },
        };
     };

    return (

        <Stack.Navigator initialRouteName="RegisOrganize" screenOptions={{gestureEnabled:true, headerShown: false }}>
            <Stack.Screen name="RegisOrganize" component={RegisOrganize}/>
            <Stack.Screen name="RegisList" component={RegisList} 
            options={{
                gestureDirection: 'horizontal',
                cardStyleInterpolator: forSlide
            }}/>
            <Stack.Screen name="RegisPhone" component={RegisPhone} 
            options={{
                gestureDirection: 'horizontal',
                cardStyleInterpolator: forSlide
            }}/>
            <Stack.Screen name="RegisMember" component={RegisMember} 
            options={{
                gestureDirection: 'horizontal',
                cardStyleInterpolator: forSlide
            }}/>
        </Stack.Navigator>
        
    );
};