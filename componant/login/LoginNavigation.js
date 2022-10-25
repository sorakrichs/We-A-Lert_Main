import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginMember from './page/LoginMember';
import LoginVolunteer from './page/LoginVolunteer';
import Icon from 'react-native-vector-icons/FontAwesome5'

const Tab = createBottomTabNavigator();

export default LoginNavigation = () => {
  return (
      <Tab.Navigator screenOptions={{headerShown : false}}>
        <Tab.Screen name = {'Member'} component = {LoginMember} 
        options={{
          tabBarLabel: 'Member',
          tabBarLabelStyle: { textAlign: 'center',fontFamily: 'Mitr-Regular' },
          tabBarIcon: ({ color, size }) => (
            <Icon name="user-alt" color={color} size={size} />
          ),
        }}/>
        <Tab.Screen name = {'Volunteer'} component = {LoginVolunteer}
        options={{
          tabBarLabel: 'Volunteer',
          tabBarIcon: ({ color, size }) => (
            <Icon name="user-nurse" color={color} size={size} />
          ),
        }}/>
      </Tab.Navigator>
  );
};