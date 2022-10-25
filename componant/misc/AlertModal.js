import React, { useState } from "react";
import { Button, Text, View, StyleSheet,Dimensions,TouchableOpacity } from "react-native";
import Modal from "react-native-modal";




const AlertModal = ({ open, onClose, title='', desc='',type,ok=null,param}) => {


  const acceptFunction = async () => {

    if(ok)
    {
      if (!!ok && typeof ok.then === 'function') {
          const func = await ok;
          await func.apply(this,param || [])
      } else {
        ok.apply(this,param || []);
      }
    }

    onClose();

  }


  return (
      <Modal style={(type == 'location') ? styles.bottomView : styles.centeredView} isVisible={open}>
        { type == 'normal' ?
        <View style= {styles.modalView1}>
          <Text style= {styles.titleText}>{title}</Text>
          <Text style= {styles.descText}>{desc}</Text>
          <TouchableOpacity style={[styles.button,{marginTop:20,backgroundColor: 'lightblue'}]} onPress = {acceptFunction}>
            <Text style={styles.bottonText}>ตกลง</Text>
          </TouchableOpacity>
        </View> : 
        type == 'ask' ?
        <View style= {styles.modalView2}>
          <Text style= {styles.titleText}>{title}</Text>
          <Text style= {styles.descText}>{desc}</Text>
          <TouchableOpacity style={[styles.button,{marginTop:30,backgroundColor: 'lightblue'}]} onPress = {acceptFunction}>
            <Text style={styles.bottonText}>ตกลง</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,{marginTop:10,backgroundColor: 'indianred'}]} onPress = {onClose}>
            <Text style={styles.bottonText}>ยกเลิก</Text>
          </TouchableOpacity>
        </View> : 
        type == 'gosee' ?
        <View style= {styles.modalView2}>
          <Text style= {styles.titleText}>{title}</Text>
          <Text style= {styles.descText}>{desc}</Text>
          <TouchableOpacity style={[styles.button,{marginTop:30,backgroundColor: 'lightblue'}]} onPress = {acceptFunction}>
            <Text style={styles.bottonText}>ไปดู</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,{marginTop:10,backgroundColor: 'indianred'}]} onPress = {onClose}>
            <Text style={styles.bottonText}>ไว้ทีหลัง</Text>
          </TouchableOpacity>
        </View> :
        type == 'location' ?
        <View style= {styles.LocationView}>
          <Text style= {styles.titleText}>{title}</Text>
          <Text style= {styles.descText}>{desc?.name}</Text>
          <Text style= {styles.descText}>{desc?.address}</Text>
          <TouchableOpacity style={[styles.button,{marginTop:10,backgroundColor: 'indianred'}]} onPress = {acceptFunction}>
            <Text style={styles.bottonText}>ตกลง</Text>
          </TouchableOpacity>
        </View> :
        <View style= {styles.modalView2}>
          <Text style= {styles.titleText}>{title}</Text>
          <Text style= {styles.descText}>{desc}</Text>
          <View style={{alignItems:"center"}}>
            <Text style= {[styles.descText,{fontWeight:"bold",marginTop:5}]}>ผู้แจ้ง</Text>
            <Text style= {styles.descText}> Username: {param[2]?.username}</Text>
            <Text style= {styles.descText}> Phone: {param[2]?.phone}</Text>
          </View>
          <TouchableOpacity style={[styles.button,{marginTop:30,backgroundColor: 'lightblue'}]} onPress = {acceptFunction}>
            <Text style={styles.bottonText}>รับเรื่อง</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,{marginTop:10,backgroundColor: 'indianred'}]} onPress = {onClose}>
            <Text style={styles.bottonText}>ไม่รับเรื่อง</Text>
          </TouchableOpacity>
        </View>
        }
      </Modal>
    )
}


export default AlertModal;

const styles = StyleSheet.create({
    modalView1: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    modalView2: {
      backgroundColor: "white",
      borderRadius: 20,
      padding: 30,
      alignItems: "center",
      justifyContent: 'center',
      shadowColor: "#000",
      shadowOffset: {
      width: 0,
      height: 4
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
  },
  LocationView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 30,
    width: '100%',
    alignItems: "center",
    justifyContent: 'center',
  },
  centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      top: 0, left: 0, right: 0, bottom: 0,
      position: 'absolute'
  },
  bottomView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      left: 0, right: 0,bottom: 0,
      position: 'absolute'
  },
    titleText: {
      fontSize: 20,
      fontFamily: 'Mitr-Bold',
      color: 'dimgray'
    },
    descText: {
      fontSize: 16,
      fontFamily: 'Mitr-Regular',
      color: 'dimgray'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        paddingLeft:50,
        paddingRight:50,
        
    },
    bottonText: {
      fontSize:18,
      fontFamily: 'Mitr-Regular',
    }
})