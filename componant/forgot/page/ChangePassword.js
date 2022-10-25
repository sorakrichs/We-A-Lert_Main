import React, { useState, useRef } from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    TextInput
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { BoxPasswordStrengthDisplay } from 'react-native-password-strength-meter';
import { useAlert } from "../../../providers/AlertProvider";
import Input from "../../subComponant/Input";
import Icon from 'react-native-vector-icons/Ionicons';
import {changePasswordBytoken} from '../../../controllers/userControllers'

const ChangePassword = ({ navigation,route }) => {
    const [confirm , setConfirm] = useState('');
    const [password,setPassword] = useState('');
    const {willAlert} = useAlert();
    const [icon,setIcon] = useState('eye')
    const [isPasswordValid,setIsPasswordValid] = useState(new Map([[0,false],[1,false],[2,false],[3,false],[4,false]]));
    const [passButton , setPassButton] = useState(false);
    const { token } = route.params;

    const editUserPassword = async () => {

        try {

            setPassButton(true)
            let test = true;
            isPasswordValid.forEach(callback => {
                test = test && callback
            })
            
            if(!test) {
                setTimeout(() => {
                    willAlert('ใส่ข้อมูลไม่ครบถ้วน','');
                },100)

            } else {

                await changePasswordBytoken(token,password);
                setTimeout(() => {
                    willAlert('บันทึกข้อมูลเรียบร้อย','');
                },100)
                navigation.navigate('Login');

            }

        } catch (err) {
            willAlert('เกิดข้อผิดพลาดขึ้น',(err?.response?.data?.message) ? err?.response?.data?.message : err?.message);
        }

    }


    return (
   <>
    <View style={styles.container}>
    <SafeAreaView style={styles.wrapper}>
        <Text style = {styles.topic}>รหัสใหม่</Text>
        <View style={styles.inputContainer}>
            <Input style={styles.inputs}
                placeholder="Password"
                keyboardType="default"
                pattern= {[ 
                `\\S`,
                '^.{8,}$', // min 8 chars
                '(?=.*\\d)', // number required
                '(?=.*[A-Z])', // uppercase letter
                ]}
                underlineColorAndroid='transparent'
                onValidation = {(checkValid) => checkValid.map( (number,index) => {
                    setIsPasswordValid(isPasswordValid.set(index,number));
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
            { !isPasswordValid.get(0) && passButton ? <Text style = {styles.errorText}>
              กรุณากรอก password
            </Text> : null}


            { !isPasswordValid.get(1) && passButton ? <Text style = {styles.errorText}>
                Password ต้องมีอย่างน้อย 8 ตัวอักษร
            </Text> : null}


            { !isPasswordValid.get(2) && passButton ? <Text style = {styles.errorText}>
                Password ต้องมีตัวเลข
            </Text> : null}

            { !isPasswordValid.get(3) && passButton ? <Text style = {styles.errorText}>
                Password ต้องมีอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว
            </Text> : null}

            <Text style = {styles.topic}>ยืนยันรหัสใหม่</Text>
            <View style={styles.inputContainer}>
                <Input style={styles.inputs}
                    placeholder="Confirm Password"
                    keyboardType="default"
                    underlineColorAndroid='transparent'
                    pattern= {
                    password
                    }
                    onValidation = {isValids => {setIsPasswordValid(prev => prev.set(4,isValids))}}
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

            { !isPasswordValid.get(4) && passButton ? <Text style = {styles.errorText}>
                Password ไม่ตรงกับที่กรอกไว้
            </Text> : null}
         <TouchableOpacity
           style={styles.button}
           onPress={async () => {
              try {

                willAlert(
                    'ยืนยันการเปลี่ยนรหัสผ่าน',
                    'กรุณาตรวจสอบข้อมูลก่อนที่จะยืนยัน', 
                    async () => await editUserPassword, 
                    null
                ,'ask')
                
              } catch (err) {

                willAlert('เกิดข้อผิดพลาดขึ้น',(err?.response?.data?.message) ? err?.response?.data?.message : err?.message)

              }
           }}
         >
           <Text style={styles.buttonText}>เปลี่ยน Password</Text>
         </TouchableOpacity>
       </SafeAreaView>
     </View>
   </>
 );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lighter,
    },

    wrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    button: {
        marginTop: 20,
        height: 50,
        width: 300,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#7CDB8A",
        shadowColor: "rgba(0,0,0,0.4)",
        shadowOffset: {
            width: 1,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },

    buttonText: {
        color: "white",
        fontSize: 14,
        fontFamily: 'Mitr-Regular'
    },
    inputs: {
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        color: 'black',
        flex:1,
        fontFamily: 'Mitr-Regular'
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:5,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    topic : {
        fontSize : 18,
        margin :10,
        color: 'dimgray',
        fontFamily: 'Mitr-Regular'
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        textAlign:'center',
        marginBottom : 10,
        fontFamily: 'Mitr-Regular'
    }
});

export default ChangePassword;