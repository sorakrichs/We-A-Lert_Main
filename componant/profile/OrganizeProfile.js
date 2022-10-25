import React,{useEffect,useState} from 'react';
import {Animated} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import EditOrganize from './page/EditOrganize'
import EditVolunteerList from './page/EditVolunteerList'
import EditPhone from './page/EditPhone'
import EditVolunteerMember from './page/EditVolunteerMember'
import AddVolunteer from './page/AddVolunteer'
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default OrganizeProfile = () => {

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

        <Stack.Navigator initialRouteName="EditOrganize" screenOptions={{gestureEnabled:true, headerShown: false }}>
            <Stack.Screen name="EditOrganize" component={EditOrganize}
            options={{
              gestureDirection: 'horizontal',
              cardStyleInterpolator: forSlide
            }}/>

            <Stack.Screen name="EditPhone" component={EditPhone}
            options={{
              gestureDirection: 'horizontal',
              cardStyleInterpolator: forSlide
            }}/> 

            <Stack.Screen name="AddVolunteer" component={AddVolunteer}
            options={{
              gestureDirection: 'horizontal',
              cardStyleInterpolator: forSlide
            }}/>

            <Stack.Screen name="EditVolunteerList" component={EditVolunteerList}
            options={{
              gestureDirection: 'horizontal',
              cardStyleInterpolator: forSlide
            }}/>    

            <Stack.Screen name="EditVolunteerMember" component={EditVolunteerMember}
            options={{
              gestureDirection: 'horizontal',
              cardStyleInterpolator: forSlide
            }}/>
            
        </Stack.Navigator>
        
    );
};