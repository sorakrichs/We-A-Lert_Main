import React, { Component ,useEffect,useState } from 'react';
import {View,StyleSheet,TextInput,Text,TouchableOpacity,ScrollView,Alert} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Input from '../../subComponant/Input'
import { useAlert } from '../../../providers/AlertProvider';
import { useAuth } from '../../../providers/AuthProvider';
import {organizationRegister} from '../../../controllers/userControllers'
const RegisOrganize = ({navigation}) => {
  
  const [icon , setIcon] = useState("plus-circle")
  const [name , setName] = useState('');
  const [branch , setBranch] = useState('');
  const [phone , setPhone] = useState([]);
  const [des , setDes] = useState('');
  const [address , setAddress] = useState(null);
  const [member, setMember] = useState([]);
  const [isValid,setIsValid] = useState(new Map([[0,false],[1,false]]));
  const [button , setButton] = useState(false)
  const {willAlert} = useAlert();
  const {OrganizeRegister} =useAuth();
    const addAddress = (name,address) => {

      setAddress(address);

    }

    const checkRegis = async () => {

      try{

        setButton(true)
        if(name && des && address && member?.length > 0 && phone.length > 0){

            let pure_phone = phone.map((item) => item.phone)
            await OrganizeRegister(member,{name: name, branchname: branch,phone: pure_phone, description: des, address: address})
            setTimeout(() => {  willAlert('ลงทะเบียนเสร็จสิ้น',''); }, 250);
            navigation.navigate('Map');
        } else {
          setTimeout(() => {  willAlert('ใส่ข้อมูลไม่ครบถ้วน','ลองตรวจสอบดูอีกครั้ง'); }, 250);
        }

      } catch (err) {

        willAlert('เครือข่ายมีปัญหา',(err?.response?.data?.message) ? err?.response?.data?.message : err?.message);

      }

    }


    return (
      <View style={styles.container}>
        <View style = {styles.header}>
          <Text style = {styles.headerText}>ลงทะเบียนหน่วยงาน</Text>
        </View>
        <ScrollView>
        <View style={styles.section}>
          <Text style={[styles.subTopic,{marginBottom:5}]}>ข้อมูลหน่วยงาน</Text>

          <Text style={styles.inputText}>ชื่อบริษัท</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                  placeholder="ชื่อบริษัท"
                  placeholderTextColor='silver'
                  keyboardType="email-address"
                  underlineColorAndroid='transparent'
                  onChangeText = {name => setName(name)}
            />
          </View>

          <View>
              { !name && button ? <Text style = {styles.errorText}>
                กรุณาใส่ชื่อบริษัท
              </Text> : null}
          </View>
          <Text style={styles.inputText}>สาขา</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="สาขา(หากมี)"
                placeholderTextColor='silver'
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText = {branch => setBranch(branch)}
            />
          </View>
          <Text style={styles.inputText}>รายละเอียด</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="รายละเอียด"
                placeholderTextColor='silver'
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText = {des => setDes(des)}
                multiline = {true}
            />
          </View>
          { !des && button ? <Text style = {styles.errorText}>
                กรุณาใส่รายละเอียดของหน่วยงาน
          </Text> : null}
        </View>
        <View style={styles.section}>
          <Text style={[styles.subTopic,{marginBottom:5}]}>ติดต่อของหน่วยงาน</Text>
          <TouchableOpacity style={[styles.addressButtonContainer, {backgroundColor:'goldenrod'}]}
              onPress = {() => navigation.navigate('RegisPhone',{phone:phone,setPhone: setPhone})}>
              <Icon name='phone' size={25} style={{marginRight:20}} color={'gold'}/>
              <Text style={styles.AddressText}>จัดการหมายเลขโทรศัพท์</Text>
          </TouchableOpacity>
          <View>
              { phone.length <= 0 && button ? <Text style = {styles.errorText}>
                ต้องใส่หมายเลขโทรศัพท์ของหน่วยงาน
              </Text> : null}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={[styles.subTopic,{marginBottom:5}]}>ที่อยู่ของหน่วยงาน</Text>
            { address ?
              <View>
                <Text style={styles.inputText}>{address?.aoi}</Text>
                <View style={{flexDirection:'row',alignSelf:'center'}}>
                  <Text style={styles.inputText}>{address?.subdistrict}</Text>
                  <Text style={styles.inputText}>{address?.district}</Text>
                </View> 
                <Text style={styles.inputText}>{address?.province}</Text>
                <Text style={styles.inputText}>{address?.postcode}</Text>
              </View> : null
            }
            <TouchableOpacity style={[styles.addressButtonContainer, styles.AddressButton]}
                onPress = {() => navigation.navigate('MapRegis',{addItem: addAddress, noName: true})}>
                <Icon name='map-pin' size={25} style={{marginRight:20}} color={'lightgreen'}/>
                <Text style={styles.AddressText}>เพิ่มที่อยู่</Text>
            </TouchableOpacity>
            { !address && button ? <Text style = {styles.errorText}>
                กรุณาใส่ที่อยู่ของหน่วยงาน
              </Text> : null}
        </View>
        <View style={styles.section}>
          <Text style={[styles.subTopic,{marginBottom:5}]}>สมาชิกในหน่วยงาน</Text>
          <TouchableOpacity style={[styles.addressButtonContainer, {backgroundColor:'goldenrod'}]}
              onPress = {() => navigation.navigate('RegisList',{members:member,setMembers: setMember})}>
              <Icon name='user' size={25} style={{marginRight:20}} color={'gold'}/>
              <Text style={styles.AddressText}>จัดการสมาชิก</Text>
          </TouchableOpacity>
          <View>
              { member.length <= 0 && button ? <Text style = {styles.errorText}>
                ต้องมีสมาชิกในหน่วยงาน
              </Text> : null}
          </View>
        </View>
        <TouchableOpacity style={[styles.buttonContainer, styles.RegisterButton]}
          onPress={
            async () => { 
              willAlert(
                'ยืนยันที่จะลงทะเบียน',
                'ตรวจสอบข้อมูลก่อนที่จะลงทะเบียน', 
                async () => await checkRegis, 
                null
                ,'ask')
            }}>
          <Text style={styles.RegisText}>ลงทะเบียน</Text>
        </TouchableOpacity>


        <TouchableOpacity style={[styles.buttonContainer, styles.backtologinButton]}
          onPress={() => navigation.navigate('Login')} >
          <Text style={styles.RegisText}>กลับไปหน้าเข้าสู่ระบบ</Text>
        </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex : 1 ,
    backgroundColor: '#F3B15A',
  },
  header : {
    height : 60,
    padding : 15,
    marginBottom:10,
    backgroundColor : 'chocolate'
  },
  headerText : {
    color : '#fff',
    fontSize : 24,
    textAlign : 'center',
    fontFamily: 'Mitr-Bold'
  },
  subTopic: {
      color:'dimgray',
      left:10,
      fontFamily: 'Mitr-Bold',
      fontSize: 18,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius:5,
    width: "80%",
    borderBottomWidth: 1,
    marginBottom:10,
    alignSelf:'center'
  },
  inputs:{
    paddingLeft:5,
    paddingRight:5,
    color: 'black',
    borderBottomColor: '#FFFFFF',
    fontFamily: 'Mitr-Regular'
  },
  section: {
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
      backgroundColor: 'aliceblue',
      margin:10,
      padding:10,
      borderRadius:10

  },
  loginButton: {
    backgroundColor: "#6699FF",
  },
  logo : {
    fontFamily: 'Mitr-Bold',
    fontSize :25,
    color : '#000000',
    marginBottom : 30,
    alignSelf : 'center',
    marginTop : 20
  },
  buttonContainer :{
    flex: 1,
    alignItems : 'center',
    height : 100,
  },
  appButtonText : {
    backgroundColor : '#4CBB17',
    height : 50,
    width : 150,
    justifyContent : 'center',
    borderRadius:10,
    textAlign : 'center',
    alignItems : 'center',
    fontFamily: 'Mitr-Regular'
  },
  cancelButtonText : {
    backgroundColor : 'red',
    height : 50,
    width : 150,
    justifyContent : 'center',
    borderRadius:10,
    textAlign : 'center',
    alignItems : 'center',
    marginTop : 20,
    fontFamily: 'Mitr-Regular'
  },
  addressButtonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:'80%',
    borderRadius:5,
    alignSelf:'center',
    fontFamily: 'Mitr-Regular'
  },
  buttonContainer: {
    height:60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:5,
    alignSelf:'center',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  RegisterButton: {
    backgroundColor: "#6699FF",
  },
  AddressButton: {
    backgroundColor: "green",
  },
  backtologinButton: {
    backgroundColor: "red",
  },
  AddressText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Mitr-Regular'
  },
  RegisText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Mitr-Regular'
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign:'center',
    marginBottom : 10,
    fontFamily: 'Mitr-Regular'
  },
  inputText: {
    color: 'darkgray',
    alignSelf:'center',
    fontSize:16,
    margin:5,
    fontFamily: 'Mitr-Regular'
  }
});

export default RegisOrganize;