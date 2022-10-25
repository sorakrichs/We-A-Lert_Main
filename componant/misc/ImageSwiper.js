import React, { useState } from "react";
import {
    View,
    Text,
    Pressable,
    SafeAreaView,
    Button,
    StyleSheet,
    TouchableHighlight,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Alert,
    Image,
    ScrollView
    } from 'react-native';
import Swiper from 'react-native-swiper'
import Modal from "react-native-modal";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SwiperComponent = ({open,onClose,images,imageIndex}) => {

    
    return (
        <Modal animationIn="fadeIn" animationOut="fadeOut" isVisible={open} onBackButtonPress={onClose}>
            <Pressable
                style={{alignSelf: 'flex-end'}}
                onPress={onClose}
            >
              <MaterialCommunityIcons name="close" color='white' size={30}/>
            </Pressable>
            {images && <Swiper style={styles.wrapper} showsButtons={true} loop={false} index={imageIndex}>
                {images?.map((image,index) =>
                     <Image key={index} style={styles.slide} source={{ uri:(image?.path) ? image?.path : image}}/>
                )} 
            </Swiper>}
        </Modal>
    )

}

module.exports = SwiperComponent;

const styles = StyleSheet.create({
    wrapper: {},
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5'
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9'
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontFamily: 'Mitr-Bold'
    }
  })