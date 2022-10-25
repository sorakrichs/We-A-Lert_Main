import React, { useState,useEffect,useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';




const LoadingScreen = ({animating=false}) => {

    return (
        <View style={styles.centerScreen} pointerEvents={'none'}>
            <ActivityIndicator size={100} animating={animating}/>
            <Text style={{fontSize:20}}>Loading</Text>
        </View>
    )

}

const styles = StyleSheet.create({


    centerScreen: {

        backgroundColor: 'rgba(52, 52, 52, 0.3)',
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center',
        zIndex: 3, 
        elevation: 3,

    }



})

module.exports = LoadingScreen;