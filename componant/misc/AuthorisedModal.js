import React, { Component ,useEffect,useState } from 'react';
import {View,StyleSheet,TextInput,Text,TouchableOpacity,ScrollView,Alert} from 'react-native';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/Ionicons';

const AuthorisedModal = ({open, onClose,acceptFunction}) => {

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [icon,setIcon] = useState('eye-off')
    return(
        <Modal isVisible={open} style={styles.centeredView} transparent={true}> 
                <View style={styles.modalView}>
                    <Text style= {styles.titleText}>ยืนยันตัวตน</Text>
                    <Text style={styles.inputText}>ชื่อบัญชี / หมายเลขโทรศัพท์</Text>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="Username / Phone"
                            placeholderTextColor='silver'
                            keyboardType="email-address"
                            underlineColorAndroid='transparent'
                            onChangeText={setUsername}
                            value = {username}
                        />
                    </View>
                    <Text style={styles.inputText}>รหัสผ่าน</Text>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="Password"
                            placeholderTextColor='silver'
                            keyboardType="default"
                            underlineColorAndroid='transparent'
                            onChangeText={setPassword}
                            secureTextEntry = {(icon == 'eye') ? true : false}
                            value = {password}
                        />
                        <TouchableOpacity 
                            style={{alignSelf:'center'}}
                            onPress={() => {
                                (icon == 'eye') ? setIcon('eye-off') : setIcon('eye');
                            }}>
                            <Icon style ={{right:20}} name = {icon} size = {20} color={'dimgray'}/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={[styles.button,{backgroundColor: 'lightblue'}]} onPress = {async () => await acceptFunction(username,password)}>
                        <Text style={{fontSize:18,fontFamily: 'Mitr-Regular',color:'dimgray'}}>ยืนยัน</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button,{marginTop:10,backgroundColor: 'indianred'}]} onPress = {onClose}>
                        <Text style={{fontSize:18,fontFamily: 'Mitr-Regular',color:'dimgray'}}>ยกเลิก</Text>
                    </TouchableOpacity>
                </View>
        </Modal>
    )
}

export default AuthorisedModal;

const styles = StyleSheet.create({
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        width:'100%',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        top: 0, left: 0, right: 0, bottom: 0,
        position: 'absolute',
    },
    titleText: {
        fontSize: 20,
        fontFamily: 'Mitr-Bold',
        color: 'dimgray',
        marginBottom:10
    },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius:5,
        width: "100%",
        borderBottomWidth: 1,
        marginBottom:10,
        alignSelf:'center'
    },
    inputs:{
        paddingLeft:5,
        paddingRight:5,
        borderBottomColor: '#FFFFFF',
        flex:1,
        color: 'black',
        fontFamily: 'Mitr-Regular'
    },
    inputText: {
        color: 'darkgray',
        alignSelf:'flex-start',
        fontSize:16,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width:'50%',
        alignItems:'center'
    }
});