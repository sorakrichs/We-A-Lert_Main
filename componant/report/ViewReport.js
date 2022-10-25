import React from 'react';
import {Animated} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import ViewReportModal from './page/ViewReportModal'
import ImageCollection from './page/FixImageCollection'
import 'react-native-gesture-handler';
const Stack = createStackNavigator();

export default ViewReport = ({route}) => {

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

        <Stack.Navigator initialRouteName="ReportModal" screenOptions={{gestureEnabled:true, headerShown: false }}>
            <Stack.Screen name="ReportModal" component={ViewReportModal} initialParams={route.params} />
            <Stack.Screen name="ImagesCollection" component={ImageCollection} 
            options={{
                gestureDirection: 'horizontal',
                cardStyleInterpolator: forSlide
            }}/>
        </Stack.Navigator>
        
    );
};