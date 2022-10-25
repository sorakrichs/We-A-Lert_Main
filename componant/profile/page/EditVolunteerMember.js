import React, { useState,useEffect,useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  Button
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar } from '../avatar';
import Header from '../../subComponant/Header'
import {useAuth} from '../../../providers/AuthProvider'
import { getUserData } from '../../../controllers/userControllers';
import Input from '../../subComponant/Input'
import { BoxPasswordStrengthDisplay } from 'react-native-password-strength-meter';
import { useAlert } from '../../../providers/AlertProvider';
import LoadingScreen from '../../misc/LoadingScreen'
import DropDownPicker from 'react-native-dropdown-picker';

const EditProfileMember = ({navigation,route}) => {

    const {itemid,member,addMember,hasBoss} = route.params
    const [user , setUser] = useState(member?.username);
    const [name , setName] = useState(member?.name);
    const [surname , setSurname] = useState(member?.surname);
    const [phone , setPhone] = useState(member?.phone);
    const [id,setID] = useState(member?.personalid);
    const [email,setEmail] = useState('');
    const [button , setButton] = useState(false)
    const [address,setAddress] = useState([]);
    const [image,setImage] = useState(member?.image);
    const [items, setItems] = useState([
      {label: 'รองหัวหน้า', value: 'deputy'},
      {label: 'เจ้าหน้าที่', value: 'staff'}
    ]);
    const [role,setRole] = useState((member?.teamrole) ? member?.teamrole : null);
    const [roleOpen,setRoleOpen] = useState(false);

    const [oldpassword,setOldPassword] = useState('');
    const [password,setPassword] = useState('');
    const [confirm , setConfirm] = useState('');
    const [passButton , setPassButton] = useState(false);
    const {session,updateVolunteerData,updateUserPassword,updateImage} = useAuth();
    const {willAlert} = useAlert();
    const [isValid,setIsValid] = useState(new Map([[0,true],[1,true],[2,true],[3,true],[4,true],[5,true],[6,true]]));
    const [isPasswordValid,setIsPasswordValid] = useState(new Map([[0,false],[1,false],[2,false],[3,false],[4,false],[5,false]]));
    const [icon,setIcon] = useState('eye')
    const [loading,setLoading] = useState(true);
    

    async function setAddresstoItem(addressData=[]) {

        let itemData = [];
        await Promise.all(addressData.map( (value) => {

            itemData.push({

                id: value._id,
                name: value.name,
                address: {
                    description: value.description, 
                    location: {lon: value.location.coordinates[0], lat: value.location.coordinates[1]},  
                    subdistrict: value.subdistrict,
                    district: value.district, 
                    province: value.province, 
                    postcode: value.postcode, 
                }


            }) 

        }))

        return itemData;


    }

    const editProfileImage = async () => {

        setLoading(true);

        try {
                
            if(!image?.path) {

                setTimeout(() => {
                    willAlert('รูปภาพยังเป็นรูปภาพเดิม','');
                },100)

            } else {
                await updateImage(image,itemid);
                addMember({...member,image:image},itemid);
                setTimeout(() => {
                    willAlert('บันทึกข้อมูลเรียบร้อย','');
                },100)
                
            }

        } catch (err) {
            setTimeout(() => {
                willAlert('เกิดข้อผิดพลาดขึ้น',(err?.response?.data?.message) ? err?.response?.data?.message : err?.message);
            },100)
        } finally {
            setLoading(false);
        }

    }

    const editUserData = async () => {

        setLoading(true);

        try {

            setButton(true)
            let test = true;
            if(email == ''){isValid.delete(6)}
            isValid.forEach(callback => {
                test = test && callback
            })
            
            if(!test || !role) {
                setTimeout(() => {
                    willAlert('ใส่ข้อมูลไม่ครบถ้วน','');
                },100)

            } else {

                await updateVolunteerData({username: user, name:name, surname: surname, email:email, personalid:id, phone:phone, teamrole: role},itemid);
                addMember({...member,username: user, name:name, surname: surname, email:email, teamrole:role, personalid:id, phone:phone},itemid);
                willAlert('บันทึกข้อมูลเรียบร้อย','');
            }

        } catch (err) {

            setTimeout(() => {
                willAlert('เกิดข้อผิดพลาดขึ้น',(err?.response?.data?.message) ? err?.response?.data?.message : err?.message);
            },100)

        } finally {
            setLoading(false);
        }

    }

    const editUserPassword = async () => {

        try {

            setPassButton(true)
            let test = true;
            isPasswordValid.forEach(callback => {
                test = test && callback
            })
            
            if(!test) {
                setTimeout(() => {
                    willAlert('ใส่ข้อมูลไม่ถูกต้อง','');
                },100)

            } else {
                
                await updateUserPassword({oldpassword: oldpassword,password: password},itemid);
                setTimeout(() => {
                    willAlert('บันทึกข้อมูลเรียบร้อย','');
                },100)

            }

        } catch (err) {
            willAlert('เกิดข้อผิดพลาดขึ้น',(err?.response?.data?.message) ? err?.response?.data?.message : err?.message,() => navigation.goBack );
        }

    }

    return (
        <View style={styles.container}> 
        <Header
                navigation={navigation}
                title = {'บัญชีสมาชิก'}
                color = {'chocolate'}
    
        />
        <ScrollView>
        <View style={styles.section}>
            <Text style={[styles.subTopic,{marginBottom:5}]}>แก้ไขรูปภาพ</Text>
            <View style={{alignItems:'center',margin:10}}>
                <Avatar
                    image={image}
                    setImage={setImage}
                />
            </View>
            <TouchableOpacity 
                style={[styles.buttonContainer,{backgroundColor : '#4CBB17'}]} 
                onPress={
                    async () => { 
                      willAlert(
                        'ยืนยันที่การแก้ไขรูปภาพ',
                        'กรุณาตรวจสอบรูปภาพ', 
                        async () => await editProfileImage, 
                        null
                        ,'ask')
                    }} >
                <Text style = {styles.TextButton}>บันทึก</Text>
            </TouchableOpacity>
        </View>

        
        <View style={styles.section}>
            <Text style={[styles.subTopic,{marginBottom:5}]}>แก้ไขข้อมูล</Text>
            <Text style = {styles.topic}>ชื่อบัญชี</Text>
            <View style = {styles.inputContainer}>
                <Input style={styles.inputs}
                        placeholder="Username"
                        placeholderTextColor='silver'
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        pattern = '\S'
                        onValidation = {isValids => {setIsValid(prev => prev.set(0,isValids))}}
                        onChangeText = {user => setUser(user)}
                        value = {user}
                />
            </View>

            { !isValid.get(0) && button ? <Text style = {styles.errorText}>
              ต้องกรอก Username
            </Text> : null}

            <Text style = {styles.topic}>ชื่อจริง</Text>
            <View style={styles.inputContainer}>
                <Input style={styles.inputs}
                    placeholder="ชื่อจริง"
                    placeholderTextColor='silver'
                    keyboardType="default"
                    underlineColorAndroid='transparent'
                    pattern = '\S'
                    onValidation = {isValids => {setIsValid(prev => prev.set(1,isValids))}}
                    onChangeText = {name => setName(name)}
                    value = {name}
                />
            </View>

            { !isValid.get(1) && button ? <Text style = {styles.errorText}>
              กรุณากรอกชื่อจริง
            </Text> : null}


            <Text style = {styles.topic}>นามสกุล</Text>
            <View style={styles.inputContainer}>
                <Input style={styles.inputs}
                    placeholder="นามสกุล"
                    placeholderTextColor='silver'
                    keyboardType="default"
                    underlineColorAndroid='transparent'
                    pattern = '\S'
                    onValidation = {isValids => {setIsValid(prev => prev.set(2,isValids))}}
                    onChangeText = {surname => setSurname(surname)}
                    value = {surname}
                />
            </View>

            { !isValid.get(2) && button ? <Text style = {styles.errorText}>
              กรุณากรอกนามสกุล
            </Text> : null}
            
            <Text style = {styles.topic}>ตำแหน่ง</Text>
            <DropDownPicker

                open={roleOpen}
                value={role}
                items={items}
                setValue={setRole}
                setOpen={setRoleOpen}
                placeholder="ตำแหน่ง"
                containerStyle={[styles.inputContainer,{marginTop:5,marginBottom:20}]}
                listMode="MODAL"
                modalProps={{
                    animationType: "slide"
                }}

            />

            <View>
                { !role && button ? <Text style = {styles.errorText}>
                กรูณาระบุตำแหน่ง
                </Text> : null}
            </View>

            <Text style = {styles.topic}>รหัสบัตรประชาชน</Text>
            <View style={styles.inputContainer}>
                <Input style={styles.inputs}
                    placeholder="รหัสบัตรประชาชน"
                    placeholderTextColor='silver'
                    keyboardType="decimal-pad"
                    underlineColorAndroid='transparent'    
                    onValidation = {isValids => {setIsValid(prev => prev.set(3,isValids))}}
                    onChangeText = {id => setID(id)}
                    checkCase = 'id'
                    value = {id}
                />
            </View>

            { !isValid.get(3) && button ? <Text style = {styles.errorText}>
            รูปแบบบัตรประชาชนผิด
            </Text> : null}

            <Text style = {styles.topic}>หมายเลขโทรศัพท์</Text>
            <View style={styles.inputContainer}>
                <Input style={styles.inputs}
                    placeholder="หมายเลขโทรศัพท์"
                    placeholderTextColor='silver'
                    keyboardType="decimal-pad"
                    underlineColorAndroid='transparent'
                    pattern= {[
                    '^[0-9]{10}$',
                    '^(0[689]{1})+([0-9]{8})+$',
                    ]}
                    onValidation = {(checkValid) => checkValid.map( (number,index) => {
                        setIsValid(isValid.set(index+4,number));
                    })}
                    onChangeText = {phone => setPhone(phone)}
                    value = {phone}
                />
            </View>

            { !isValid.get(4) && button ? <Text style = {styles.errorText}>
                หมายเลขโทรศัพท์ไม่ครบ 10 ตัว
            </Text> : null}


            { !isValid.get(5) && button ? <Text style = {styles.errorText}>
                หมายเลขโทรศัพท์ผิดรูปแบบในประเทศไทย
            </Text> : null}

            <Text style = {styles.topic}>อีเมล</Text>
            <View style={styles.inputContainer}>
                <Input style={styles.inputs}
                    placeholder="Email (ถ้ามี)"
                    placeholderTextColor='silver'
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    pattern = '^\S+@\S+\.\S+'
                    onValidation = {isValids => {setIsValid(prev => prev.set(6,isValids))}}
                    onChangeText = {Email => setEmail(Email)}
                    value = {email}
                />
            </View>

            { !isValid.get(6) && button && email ? <Text style = {styles.errorText}>
              ผิดรูปแบบ Email
            </Text> : null}


            <TouchableOpacity 
                style={[styles.buttonContainer,{backgroundColor : '#4CBB17'}]} 
                onPress={
                    async () => { 
                      willAlert(
                        'ยืนยันที่จะลงทะเบียน',
                        'กรุณาตรวจสอบข้อมูลก่อนที่จะลงทะเบียน', 
                        async () => await editUserData, 
                        null
                        ,'ask')
                    }} >
                <Text style = {styles.TextButton}>บันทึก</Text>
            </TouchableOpacity>
        </View>



        <View style={styles.section}>
            <Text style={[styles.subTopic,{marginBottom:5}]}>เปลี่ยนรหัสผ่าน</Text>
            <Text style = {styles.topic}>รหัสเก่าผ่าน</Text>
            <View style={styles.inputContainer}>
                <Input style={styles.inputs}
                    placeholder="Old Password"
                    placeholderTextColor='silver'
                    keyboardType="default"
                    pattern = '\S'
                    underlineColorAndroid='transparent'
                    onValidation = {isValids => {setIsPasswordValid(prev => prev.set(0,isValids))}}
                    onChangeText = {password => setOldPassword(password)}
                    secureTextEntry = {(icon == 'eye') ? true : false}
                    value = {oldpassword}
                />
                <TouchableOpacity 
                    style={{alignSelf:'center'}}
                    onPress={() => {
                        (icon == 'eye') ? setIcon('eye-off') : setIcon('eye');
                    }}>
                    <Icon style ={{right:20}} name = {icon} size = {20} color={'dimgray'}/>
                </TouchableOpacity>
            </View>
            
            { !isPasswordValid.get(0) && passButton ? <Text style = {styles.errorText}>
              กรุณากรอก password เดิม
            </Text> : null}


            <Text style = {styles.topic}>รหัสผ่านใหม่</Text>
            <View style={styles.inputContainer}>
                <Input style={styles.inputs}
                    placeholder="New Password"
                    placeholderTextColor='silver'
                    keyboardType="default"
                    pattern= {[ 
                    `\\S`,
                    '^.{8,}$', // min 8 chars
                    '(?=.*\\d)', // number required
                    '(?=.*[A-Z])', // uppercase letter
                    ]}
                    underlineColorAndroid='transparent'
                    onValidation = {(checkValid) => checkValid.map( (number,index) => {
                        setIsPasswordValid(isPasswordValid.set(index+1,number));
                    })}
                    onChangeText = {password => setPassword(password)}
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
            
            <View style={{alignItems:'center',marginBottom:20}}>
                <BoxPasswordStrengthDisplay
                    password={password}
                    width={250}
                    boxColor={'gainsboro'}
                    variations = {{
                    digits: /\d[2]/,
                    lower: /[a-z][2]/,
                    upper: /[A-Z][2]/,
                    nonWords: /\W[2]/,
                    }}
                    minLength = {8}
                    levels = {[
                    {
                        label: 'Weak',
                        labelColor: '#ff6900',
                        activeBarColor: '#ff6900',
                    },
                    {
                        label: 'Average',
                        labelColor: '#f3d331',
                        activeBarColor: '#f3d331',
                    },
                    {
                        label: 'Strong',
                        labelColor: '#14eb6e',
                        activeBarColor: '#14eb6e',
                    },
                    {
                        label: 'Very Strong',
                        labelColor: '#00ff6b',
                        activeBarColor: '#00ff6b',
                    }
                    ]}
                />
            </View>
            { !isPasswordValid.get(1) && passButton ? <Text style = {styles.errorText}>
              กรุณากรอก password ที่จะเปลี่ยน
            </Text> : null}


            { !isPasswordValid.get(2) && passButton ? <Text style = {styles.errorText}>
                Password ต้องมีอย่างน้อย 8 ตัวอักษร
            </Text> : null}


            { !isPasswordValid.get(3) && passButton ? <Text style = {styles.errorText}>
                Password ต้องมีตัวเลข
            </Text> : null}

            { !isPasswordValid.get(4) && passButton ? <Text style = {styles.errorText}>
                Password ต้องมีอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว
            </Text> : null}

            <Text style = {styles.topic}>ยืนยันผ่านรหัสใหม่</Text>
            <View style={styles.inputContainer}>
                <Input style={styles.inputs}
                    placeholder="Confirm Password"
                    placeholderTextColor='silver'
                    keyboardType="default"
                    underlineColorAndroid='transparent'
                    pattern= {
                    password
                    }
                    onValidation = {isValids => {setIsPasswordValid(prev => prev.set(5,isValids))}}
                    onChangeText = {confirm => setConfirm(confirm)}
                    checkCase = 'confirm'
                    secureTextEntry = {(icon == 'eye') ? true : false}
                    value = {confirm}
                />
                <TouchableOpacity 
                    style={{alignSelf:'center'}}
                    onPress={() => {
                        (icon == 'eye') ? setIcon('eye-off') : setIcon('eye');
                    }}>
                    <Icon style ={{right:20}} name = {icon} size = {20} color={'dimgray'}/>
                </TouchableOpacity>
            </View>

            { !isPasswordValid.get(5) && passButton ? <Text style = {styles.errorText}>
                Password ไม่ตรงกับที่กรอกเอาไว้
            </Text> : null}

                    
            <TouchableOpacity 
                style={[styles.buttonContainer,{backgroundColor : '#4CBB17'}]} 
                onPress={
                    async () => { 
                      willAlert(
                        'ยืนยันที่จะเปลี่ยนรหัส',
                        'กรุณาตรวจสอบข้อมูลก่อนที่จะเปลี่ยนรหัส', 
                        async () => await editUserPassword, 
                        null
                        ,'ask')
                    }} >
                <Text style = {styles.TextButton}>บันทึก</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>


      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF4A3',
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
  subTopic: {
      left:10,
      fontFamily: 'Mitr-Bold',
      fontSize: 18,
      color: 'dimgray'
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius:5,
    width: "80%",
    borderBottomWidth: 1,
    marginBottom:10,
    alignSelf:'center'
  },
  inputs:{
    paddingLeft:5,
    paddingRight:5,
    borderBottomColor: '#FFFFFF',
    color: 'black',
    flex:1,
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
  fieldsContainer: {
    flexDirection : 'row',
    marginTop : 10
  },
  fieldsItemContainer: {
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'center',
  },
  fieldsValueContainer: {
    flexDirection : 'row',
    alignItems : 'center'
  },
  topic : {
    left : 45,
    fontSize : 15,
    marginTop :10,
    fontFamily: 'Mitr-Regular',
    color: 'dimgray'
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
    marginTop:20
  },
  appButtonText : {
    backgroundColor : '#4CBB17',
    justifyContent : 'center',
    borderRadius:10,
    textAlign : 'center',
    alignItems : 'center',
    fontFamily: 'Mitr-Regular'
  },
  TextButton : {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  errorText: {
      color: 'red',
      fontSize: 14,
      textAlign:'center',
      marginBottom : 10
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
  AddressButton: {
    backgroundColor: "green",
  },
  AddressText: {
    color: 'white',
    fontSize: 18
  }
});

export default EditProfileMember;