import React, { Component , useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Header from '../subComponant/Header'

const FireMain = ({navigation}) => {
  return(
    <View style={styles.container}>
      <Header
                navigation={navigation}
                title = {'คู่มือรับมือไฟไหม้'}
                color = {'chocolate'}
      />
    <View style = {{flex:1,justifyContent : 'center',alignContent : 'center'}}>
      <TouchableOpacity style = {[styles.backButton,{backgroundColor:'orange'}]} onPress={() => navigation.navigate('FireClassA')}>
        <Icons name = {'fire'} size = {30} style = {{right : 10}}></Icons>
        <Text style={styles.text}>ไฟไหม้ประเภทของแข็ง</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {[styles.backButton,{backgroundColor:'orange'}]} onPress={() => navigation.navigate('FireClassB')}>
        <Icons name = {'fire'} size = {30} style = {{right : 10}}></Icons>
        <Text style={styles.text}>ไฟไหม้ประเภทของเหลวและแก็ส</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {[styles.backButton,{backgroundColor:'orange'}]} onPress={() => navigation.navigate('FireClassC')}>
        <Icons name = {'fire'} size = {30} style = {{right : 10}}></Icons>
        <Text style={styles.text}>ไฟไหม้ประเภทเครื่องใช้ไฟฟ้า</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {[styles.backButton,{backgroundColor:'orange'}]} onPress={() => navigation.navigate('FireClassD')}>
        <Icons name = {'fire'} size = {30} style = {{right : 10}}></Icons>
        <Text style={styles.text}>ไฟไหม้ประเภทสารเคมี</Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}


const styles = StyleSheet.create({
  container:{
      flex:1,
    },
    topView:{
      width: '100%', 
      backgroundColor : '#50C878',
      justifyContent: 'center', 
      alignItems: 'center',
      height : 60
      },
    topMenu :
    {
      flexDirection : 'row',
      fontSize : 20,
      alignItems : 'center',
      flex : 1,
      justifyContent : 'center',
      alignContent : 'center',
      position : 'absolute',
      fontFamily: 'Mitr-Bold'
    },
    IconMenu : {
      right : 165
    },  
    name:{
      fontSize:22,
      color:"#FFFFFF",
      fontWeight:'600',
    },
    postContent: {
      flex: 1,
      padding:30,
      bottom : 30
    },
    postTitle:{
      fontSize:26,
      fontWeight:'600',
    },
    postDescription:{
      fontSize:16,
      marginTop:10,
    },
    tags:{
      color: '#8F00FF',
      marginTop:10,
    },
    date:{
      color: '#696969',
      marginTop:10,
    },
    picture: {
      width: 350,
      height: 200,
      borderRadius: 35,
      borderWidth: 4,
      borderColor: "#00BFFF",
    },
    pictureView:{
      flexDirection: 'row',
      marginTop:20,
      justifyContent :'center'
    },
    name:{
      fontSize:22,
      color:"#00BFFF",
      fontWeight:'600',
      alignSelf:'center',
      marginLeft:10
    }, 
    backButton: {
      margin:20,
      height:60,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:30,
      backgroundColor: '#50C878',
    },
    backButtonText:{
      color: "#FFFFFF",
      fontSize:20,
    },
    borderButton : {
      borderTopWidth : 1,
      borderColor : 'green'
    },
    text: {
      fontFamily: 'Mitr-Bold',
      fontSize:20
    }
})

export default FireMain;