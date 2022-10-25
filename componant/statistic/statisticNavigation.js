import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import reportStatistic from './page/ReportStatistic';
import userStatistic from './page/UserStatistic';
import Icon from 'react-native-vector-icons/FontAwesome5'

const Tab = createBottomTabNavigator();

export default StatisticNavigation = () => {
  return (
      <Tab.Navigator screenOptions={{headerShown : false}}>
        <Tab.Screen name = {'Disaster'} component = {reportStatistic} 
        options={{
          tabBarLabel: 'รวม',
          tabBarIcon: ({ color, size }) => (
            <Icon name="map-marked-alt" color={color} size={size} />
          ),
        }}/>
        <Tab.Screen name = {'User'} component = {userStatistic}
        options={{
          tabBarLabel: 'ส่วนตัว',
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}/>
      </Tab.Navigator>
  );
};