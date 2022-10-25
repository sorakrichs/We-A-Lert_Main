import React,{useEffect,useState} from 'react';
import {Animated} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Accident from '../../componant/manual/Accident'
import CovidPandemic from '../../componant/manual/CovidPandemic'
import Earthquake from '../../componant/manual/Earthquake'
import FireClassA from '../../componant/manual/FireClassA'
import FireClassB from '../../componant/manual/FireClassB'
import FireClassC from '../../componant/manual/FireClassC';
import FireClassD from '../../componant/manual/FireClassD';
import FireMain from '../../componant/manual/FireMain'
import MainManualScreen from '../../componant/manual/MainManualScreen'
import MainPandemic from '../../componant/manual/MainPandemic'
import Flood from '../../componant/manual/Flood'
import 'react-native-gesture-handler';
const Stack = createStackNavigator();

export default Manual = () => {

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

        <Stack.Navigator initialRouteName="MainManualScreen" screenOptions={{gestureEnabled:true, headerShown: false }}>
            <Stack.Screen name="MainManualScreen" component={MainManualScreen} />
            <Stack.Screen name="FireMain" component={FireMain} 
            options={{
                gestureDirection: 'horizontal',
                cardStyleInterpolator: forSlide
            }}/>
            <Stack.Screen name="Earthquake" component={Earthquake}  
            options={{
                gestureDirection: 'horizontal',
                cardStyleInterpolator: forSlide
            }}/>
            <Stack.Screen name="MainPandemic" component={MainPandemic}  
            options={{
                gestureDirection: 'horizontal',
                cardStyleInterpolator: forSlide
            }}/>
            <Stack.Screen name="Flood" component={Flood}  
            options={{
                gestureDirection: 'horizontal',
                cardStyleInterpolator: forSlide
            }}/>
            <Stack.Screen name="Accident" component={Accident}  
            options={{
                gestureDirection: 'horizontal',
                cardStyleInterpolator: forSlide
            }}/>
            <Stack.Screen name="FireClassA" component={FireClassA}  
            options={{
                gestureDirection: 'horizontal',
                cardStyleInterpolator: forSlide
            }}/>
            <Stack.Screen name="FireClassB" component={FireClassB}  
            options={{
                gestureDirection: 'horizontal',
                cardStyleInterpolator: forSlide
            }}/>
            <Stack.Screen name="FireClassC" component={FireClassC}  
            options={{
                gestureDirection: 'horizontal',
                cardStyleInterpolator: forSlide
            }}/>
            <Stack.Screen name="FireClassD" component={FireClassD}  
            options={{
                gestureDirection: 'horizontal',
                cardStyleInterpolator: forSlide
            }}/>
            <Stack.Screen name="CovidPandemic" component={CovidPandemic}  
            options={{
                gestureDirection: 'horizontal',
                cardStyleInterpolator: forSlide
            }}/>
        </Stack.Navigator>
        
    );
};