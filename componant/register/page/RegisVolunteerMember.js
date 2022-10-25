import React, { Component ,useEffect,useState } from 'react';
import {View,StyleSheet,Text,TouchableOpacity,ScrollView,Alert} from 'react-native';

import { BoxPasswordStrengthDisplay } from 'react-native-password-strength-meter';

import Icon from 'react-native-vector-icons/FontAwesome5';
import IconI from 'react-native-vector-icons/Ionicons';
import Input from '../../subComponant/Input'
import { useAlert } from '../../../providers/AlertProvider';
import { useAuth } from '../../../providers/AuthProvider';
import { Avatar } from '../../profile/avatar';
import DropDownPicker from 'react-native-dropdown-picker';
import Header from '../../subComponant/Header'

const RegisVolunteerMember = ({navigation,route}) => {
    
    const {itemid,member,addMember,hasBoss} = route.params
    const [user , setUser] = useState(member?.username);
    const [name , setName] = useState(member?.name);
    const [surname , setSurname] = useState(member?.surname);
    const [confirm , setConfirm] = useState(member?.password);
    const [password,setPassword] = useState((member?.password) ? member?.password : '');
    const [phone , setPhone] = useState(member?.phone);
    const [id,setID] = useState(member?.personalid);
    const [email,setEmail] = useState((member?.email) ? member?.email : '');
    const [icon , setIcon] = useState("eye-off")
    const [button , setButton] = useState(false)
    const [address,setAddress] = useState([]);
    const {willAlert} = useAlert();
    const [image,setImage] = useState(member?.image);
    const [items, setItems] = useState((!hasBoss) ? [
        {label: 'หัวหน้า', value: 'leader'},
        {label: 'รองหัวหน้า', value: 'deputy'},
        {label: 'เจ้าหน้าที่', value: 'staff'}
    ] : [
      {label: 'รองหัวหน้า', value: 'deputy'},
      {label: 'เจ้าหน้าที่', value: 'staff'}
    ]);
    const [role,setRole] = useState((member?.teamrole) ? member?.teamrole : null);
    const [roleOpen,setRoleOpen] = useState(false);
    const [isSecureEntry,setIsSecureEntry] = useState(true);
    const [isValid,setIsValid] = useState(new Map([[0,(member?.username)? true:false],
    [1,(member?.password)? true:false],[2,(member?.password)? true:false],[3,(member?.password)? true:false],
    [4,(member?.password)? true:false],[5,(member?.password)? true:false],[6,(member?.name)? true:false],
    [7,(member?.surname)? true:false],[8,(member?.personalid)? true:false],[9,(member?.phone)? true:false],
    [10,(member?.phone)? true:false],[11,(member?.email)? true:false]]));

    const [check , setCheck] = useState(false)
    const checkRegis = async () => {

        setButton(true)
        let test = true;
        if(email == '')
        {
          isValid.delete(11);
        }
        isValid.forEach(callback => {
          test = test && callback
        })


        if(!test && !role) {

          willAlert('ใส่ข้อมูลไม่ครบถ้วน','');


        } else {

        let only_address = address.map( (place) => {
            place.address.name = place.name;
            place.address.location = {
                type:'Point',
                coordinates: [place.address.location.lon,place.address.location.lat]
            }
            return place.address;
            }
        )

            
            addMember({username: user, password: password, name:name, surname: surname, role:'volunteer', email:email, teamrole:role, personalid:id, phone:phone,image:image},itemid);
            navigation.goBack();

        }
  
    }

    

    return (
      <View style={styles.container}>
        <Header
                navigation={navigation}
                title = {'ลงทะเบียนสมาชิก'}
                color = {'chocolate'}
    
        />
        <ScrollView>
            <View style={{alignItems:'center',margin:10}}>
                <Avatar
                    image={image}
                    setImage={setImage}
                />
            </View>
            <Text style = {styles.topic}>ชื่อบัญชี</Text>
            <View style={styles.inputContainer}>
                <Input style={styles.inputs}
                    placeholder="Username"
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    pattern = '\S'
                    onValidation = {isValids => {setIsValid(prev => prev.set(0,isValids))}}
                    onChangeText = {user => setUser(user)}
                    value = {user}
                />
            </View>
            <View>
              { !isValid.get(0) && button ? <Text style = {styles.errorText}>
                ต้องกรอก Username
              </Text> : null}
            </View>
          <Text style = {styles.topic}>รหัสผ่าน</Text>
          <View style={styles.inputContainer}>
            <Input style={[styles.inputs,{width:'85%'}]}
                placeholder="Password"
                placeholderTextColor='silver'
                keyboardType="default"
                pattern= {[ 
                  `\\S`,
                  '^.{8,}$', // min 8 chars
                  '(?=.*\\d)', // number required
                  '(?=.*[A-Z])', // uppercase letter
                ]}
                secureTextEntry={isSecureEntry}
                underlineColorAndroid='transparent'
                onValidation = {(checkValid) => checkValid.map( (number,index) => {
                  setIsValid(isValid.set(index+1,number));
                })}
                onChangeText = {password => setPassword(password)}
                value = {password}
            />
            <TouchableOpacity onPress={() => {(isSecureEntry) ? setIcon("eye") : setIcon("eye-off"); setIsSecureEntry(!isSecureEntry);}}>
              <IconI name = {icon} size = {20} color={'dimgray'}/>
            </TouchableOpacity>
          </View>
          
          <BoxPasswordStrengthDisplay
            password={password}
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
          <View>
            { !isValid.get(1) && button ? <Text style = {styles.errorText}>
              Password ต้องกรอกข้อมูล
            </Text> : null}
          </View>
          <View>
            { !isValid.get(2) && button ? <Text style = {styles.errorText}>
              Password ต้องมีอย่างน้อย 8 ตัวอักษร
            </Text> : null}
          </View>
          <View>
            { !isValid.get(3) && button ? <Text style = {styles.errorText}>
              Password ต้องมีตัวเลข
            </Text> : null}
          </View>
          <View>
            { !isValid.get(4) && button ? <Text style = {styles.errorText}>
              Password ต้องมีอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว
            </Text> : null}
          </View>

          <Text style = {styles.topic}>ยืนยันรหัสผ่าน</Text>
          <View style={[styles.inputContainer]}>
            <Input style={[styles.inputs,{width:'85%'}]}
                placeholder="Confirm Password"
                placeholderTextColor='silver'
                keyboardType="default"
                underlineColorAndroid='transparent'
                pattern= {
                  password
                }
                onValidation = {isValids => {setIsValid(prev => prev.set(5,isValids))}}
                onChangeText = {confirm => setConfirm(confirm)}
                secureTextEntry={isSecureEntry}
                checkCase = 'confirm'
                value = {confirm}
            />
            <TouchableOpacity onPress={() => {(isSecureEntry) ? setIcon("eye") : setIcon("eye-off"); setIsSecureEntry(!isSecureEntry);}}>
              <IconI name = {icon} size = {20} color={'dimgray'}/>
            </TouchableOpacity>
          </View>

          <View>
            { !isValid.get(5) && button ? <Text style = {styles.errorText}>
              Password ไม่ตรงกับที่กรอกเอาไว้
            </Text> : null}
          </View>

          <Text style = {styles.topic}>ชื่อจริง</Text>
          <View style={styles.inputContainer}>
            <Input style={styles.inputs}
                placeholder="ชื่อจริง"
                keyboardType="default"
                underlineColorAndroid='transparent'
                pattern = '\S'
                onValidation = {isValids => {setIsValid(prev => prev.set(6,isValids))}}
                onChangeText = {name => setName(name)}
                value = {name}
            />
          </View>
            <View>
                { !isValid.get(6) && button ? <Text style = {styles.errorText}>
                จำเป็นต้องกรอกชื่อจริง
                </Text> : null}
            </View>

            <Text style = {styles.topic}>นามสกุล</Text>
            <View style={styles.inputContainer}>
                <Input style={styles.inputs}
                    placeholder="นามสกุล"
                    keyboardType="default"
                    underlineColorAndroid='transparent'
                    pattern = '\S'
                    onValidation = {isValids => {setIsValid(prev => prev.set(7,isValids))}}
                    onChangeText = {surname => setSurname(surname)}
                    value = {surname}
                />
            </View>
            <View>
                { !isValid.get(7) && button ? <Text style = {styles.errorText}>
                จำเป็นต้องกรอกนามสกุล
                </Text> : null}
            </View>
            
            <Text style = {styles.topic}>ตำแหน่ง</Text>
            <DropDownPicker

                open={roleOpen}
                value={role}
                items={items}
                setValue={setRole}
                setOpen={setRoleOpen}
                placeholder="ตำแหน่ง"
                containerStyle={[styles.inputContainer,{marginTop:5,marginBottom:20,}]}
                listMode="MODAL"
                modalProps={{
                    animationType: "slide"
                }}
                textStyle={{
                  fontFamily: 'Mitr-Regular'
                }}

            />

            <View>
                { !role && button ? <Text style = {styles.errorText}>
                กรูณาระบุตำแหน่งในหน่วยงาน
                </Text> : null}
            </View>
          
          <Text style = {styles.topic}>รหัสบัตรประชาชน</Text>
          <View style={styles.inputContainer}>
            <Input style={styles.inputs}
                placeholder="รหัสบัตรประชาชน"
                keyboardType="decimal-pad"
                underlineColorAndroid='transparent'    
                onValidation = {isValids => {setIsValid(prev => prev.set(8,isValids))}}
                onChangeText = {id => setID(id)}
                checkCase = 'id'
                value = {id}
            />
          </View>
          <View>
            { !isValid.get(8) && button ? <Text style = {styles.errorText}>
              รูปแบบบัตรประชาชนไม่ถูกต้อง
            </Text> : null}
          </View>
          
          <Text style = {styles.topic}>หมายเลขโทรศัพท์</Text>
          <View style={styles.inputContainer}>
            <Input style={styles.inputs}
                placeholder="หมายเลขโทรศัพท์"
                keyboardType="decimal-pad"
                underlineColorAndroid='transparent'
                pattern= {[
                  '^[0-9]{10}$',
                  '^(0[689]{1})+([0-9]{8})+$',
                ]}
                onValidation = {(checkValid) => checkValid.map( (number,index) => {
                  setIsValid(isValid.set(index+9,number));
                })}
                onChangeText = {phone => setPhone(phone)}
                value = {phone}
            />
          </View>
          <View>
            { !isValid.get(9) && button ? <Text style = {styles.errorText}>
              หมายเลขโทรศัพท์ไม่ครบ 10 ตัว
            </Text> : null}
          </View>
          <View>
            { !isValid.get(10) && button ? <Text style = {styles.errorText}>
              หมายเลขโทรศัพท์ผิดรูปแบบในประเทศไทย
            </Text> : null}
          </View>
          
          <Text style = {styles.topic}>อีเมลล์</Text>
          <View style={styles.inputContainer}>
            <Input style={styles.inputs}
                placeholder="Email (ถ้ามี)"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                pattern = '^\S+@\S+\.\S+'
                onValidation = {isValids => {setIsValid(prev => prev.set(11,isValids))}}
                onChangeText = {Email => setEmail(Email)}
                value = {email}
            />
          </View>
          <View>
            { !isValid.get(11) && button && email ? <Text style = {styles.errorText}>
              ผิดรูปแบบ Email
            </Text> : null}
          </View>
        </ScrollView>
        <View style={{flexDirection:'row',alignItems:'center',backgroundColor: 'khaki'}}>
            <TouchableOpacity style={[styles.buttonContainer, styles.RegisterButton]}
                onPress = {() => checkRegis()}>
                <Text style={styles.RegisText}>ยืนยันการลงทะเบียน</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3B15A',
  },
  header : {
    height : 60,
    padding : 15,
    marginBottom:10,
    backgroundColor : 'darkcyan'
  },
  headerText : {
    color : '#fff',
    fontSize : 24,
    textAlign : 'center',
    fontFamily: 'Mitr-Bold'
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius:5,
    borderBottomWidth: 1,
    width: "80%",
    height: 45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',
    alignSelf:'center'
  },
  inputs:{
    height:45,
    marginLeft:16,
    width: "90%",
    color: 'black',
    borderBottomColor: '#FFFFFF',
    fontFamily: 'Mitr-Regular'
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
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
    padding : 10 ,
    margin : 10,
    flex:1,
    alignItems:'center',
    borderRadius:10
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
    fontSize: 18
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
  logo : {
    fontFamily: 'Mitr-Bold',
    fontSize :25,
    color : '#000000',
    marginBottom : 40,
    marginTop : 20
  },
  topic : {
    left : 45,
    fontSize : 15,
    marginTop :10,
    marginBottom :5,
    fontFamily: 'Mitr-Bold',
    color: 'dimgray'
  },
});

export default RegisVolunteerMember;