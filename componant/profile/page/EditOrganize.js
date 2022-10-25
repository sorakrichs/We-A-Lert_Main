import React, { Component ,useEffect,useState } from 'react';
import {View,StyleSheet,TextInput,Text,TouchableOpacity,ScrollView,Alert} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Input from '../../subComponant/Input'
import { useAlert } from '../../../providers/AlertProvider';
import { useAuth } from '../../../providers/AuthProvider';
import {getOrganizeData} from '../../../controllers/userControllers'
import AuthorisedModal from '../../misc/AuthorisedModal';
import uuid from 'uuid-random';
import Header from '../../subComponant/Header'

const EditOrganize = ({navigation}) => {
  const [id,setId] = useState(null)
  const [name , setName] = useState('');
  const [branch , setBranch] = useState('');
  const [phone , setPhone] = useState([]);
  const [des , setDes] = useState('');
  const [address , setAddress] = useState(null);
  const [member, setMember] = useState([]);
  const [isValid,setIsValid] = useState(new Map([[0,false],[1,false]]));
  const [button , setButton] = useState(false)
  const {willAlert} = useAlert();
  const {session,OrganizeRegister,updateVolunteerAddress,updateOrganizeData} = useAuth();
  const [open,setOpen] = useState(true);
    
    const addAddress = async (name,address) => {

        setAddress(address);
        await updateVolunteerAddress(id,address).catch((err) =>
            {willAlert('เกิดข้อผิดพลาดขึ้น',(err?.response?.data?.message) ? err?.response?.data?.message : err?.message);}
        );
    }


    const editOrganizeData = async () => {

      try{

        setButton(true)

        if(name && des){
            await updateOrganizeData(id,{name: name, branchname: branch,phone: phone, description: des}),
            setTimeout(() => {
                willAlert('บันทึกข้อมูลเรียบร้อย','');
            },100)
        } else {
          setTimeout(() => {  willAlert('ใส่ข้อมูลไม่ครบถ้วน','ลองตรวจสอบดูอีกครั้ง'); }, 250);
        }

      } catch (err) {

        setTimeout(() => { willAlert('เครือข่ายมีปัญหา',err.message)}, 100);

      }

    }


    return (
      <View style={styles.container}>
        <AuthorisedModal 
            open={open}
            onClose={() => {
                setOpen(false)
                navigation.goBack();
            }}
            acceptFunction={ async (username,password) => {
                    try {

                        let data = await getOrganizeData({id: session.id,usernameorphone: username,password: password});
                        if(data?.organization._id) {
                            setId(data?.organization._id);
                        }
                        if(data?.organization.name) {
                            setName(data.organization.name);
                            setIsValid(prev => prev.set(0,true))
                        }
                        if(data?.organization.branchname) {
                            setBranch(data.organization.branchname);
                            setIsValid(prev => prev.set(1,true))
                        }
                        if(data?.organization.description) {
                            setDes(data.organization.description);
                        }
                        if(data?.organization.phone) {
                            let phoneArray = data?.organization.phone.map((value) => {

                                return {id: uuid(),phone: value}
                            })
                            setPhone(phoneArray);
                        }
                        if(data?.organization.address) {

                            const addressLocation = data?.organization.address
                            addressLocation.location = {
                                lon: data?.organization.address.location.coordinates[0],
                                lat: data?.organization.address.location.coordinates[1]
                            }
                            setAddress(addressLocation);
                        }
                        if(data?.volunteers) {
                            let memberArray = data?.volunteers.map((value) => {

                                return {id: value._id ,member: value}
                            })
                            
                            setMember(memberArray);
                        }
                        
                        setOpen(false);
                    } catch(err) {
                        willAlert('เกิดข้อผิดพลาดขึ้น',(err?.response?.data?.message) ? err?.response?.data?.message : err?.message);
                    }

                }
            }
        />
        <Header
                navigation={navigation}
                title = {'บัญชีหน่วยงาน'}
                color = {'chocolate'}
    
        />
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
                  value={name}
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
                value={branch}
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
                value={des}
                multiline = {true}
            />
          </View>
          { !des && button ? <Text style = {styles.errorText}>
                กรุณาใส่รายละเอียดของหน่วยงาน
          </Text> : null}
          <TouchableOpacity 
                style={[styles.buttonContainer,{backgroundColor : '#4CBB17'}]} 
                onPress={
                    async () => { 
                      willAlert(
                        'ยืนยันการเปลี่ยนแปลงข้อมูล',
                        'กรุณาตรวจสอบข้อมูลก่อนที่จะลงทะเบียน', 
                        async () => await editOrganizeData, 
                        null
                        ,'ask')
                    }} >
                <Text style = {styles.TextButton}>บันทึก</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={[styles.subTopic,{marginBottom:5}]}>ติดต่อของหน่วยงาน</Text>
          <TouchableOpacity style={[styles.addressButtonContainer, {backgroundColor:'goldenrod'}]}
              onPress = {() => navigation.navigate('EditPhone',{phone:phone,setPhone: setPhone,organizeId: id})}>
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
                onPress = {() => navigation.navigate('MapRegis',{item: {address: address}, addItem: addAddress, noName: true})}>
                <Icon name='map-pin' size={25} style={{marginRight:20}} color={'lightgreen'}/>
                <Text style={styles.AddressText}>เปลี่ยนที่อยู่</Text>
            </TouchableOpacity>
            { !address && button ? <Text style = {styles.errorText}>
                กรุณาใส่ที่อยู่ของหน่วยงาน
              </Text> : null}
        </View>
        <View style={styles.section}>
          <Text style={[styles.subTopic,{marginBottom:5}]}>สมาชิกในหน่วยงาน</Text>
          <TouchableOpacity style={[styles.addressButtonContainer, {backgroundColor:'goldenrod'}]}
              onPress = {() => navigation.navigate('EditVolunteerList',{member:member,setMember: setMember,organizeId: id})}>
              <Icon name='user' size={25} style={{marginRight:20}} color={'gold'}/>
              <Text style={styles.AddressText}>จัดการสมาชิก</Text>
          </TouchableOpacity>
          <View>
              { member.length <= 0 && button ? <Text style = {styles.errorText}>
                ต้องมีสมาชิกในหน่วยงาน
              </Text> : null}
          </View>
        </View>


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
  loginText: {
    color: 'white',
    fontFamily: 'Mitr-Regular'
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
    marginTop : 20
  },
  addressButtonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:'80%',
    borderRadius:5,
    alignSelf:'center'
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
  },
  TextButton : {
    fontSize: 20,
    color: "#fff",
    fontFamily: 'Mitr-Bold'
  },
});

export default EditOrganize;