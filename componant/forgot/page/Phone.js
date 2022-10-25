import React, { useState, useRef } from "react";
import {
 SafeAreaView,
 StyleSheet,
 View,
 TouchableOpacity,
 Text,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import PhoneInput from "react-native-phone-number-input";
import {findUserByPhone} from '../../../controllers/userControllers'
import { sendSmsVerification } from "../../../controllers/verificationControllers";
import { useAlert } from "../../../providers/AlertProvider";
import LoadingScreen from '../../misc/LoadingScreen'

const Phone = ({ navigation }) => {
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const {willAlert} = useAlert();
  const [loading,setLoading] = useState(false);
 return (
   <>
     <View style={styles.container}>
       <SafeAreaView style={styles.wrapper}>
         <View style={styles.welcome}>
           <Text style={styles.topic}>ลืมรหัสผ่าน</Text>
         </View>
         <PhoneInput
           defaultValue={value}
           defaultCode="TH"
           layout="first"
           onChangeText={(text) => {
             setValue(text);
           }}
           onChangeFormattedText={(text) => {
             setFormattedValue(text);
           }}
           countryPickerProps={{ withAlphaFilter: true }}
           withShadow
           autoFocus
         />
         <TouchableOpacity
           style={styles.button}
           onPress={async () => {
              try {
                setLoading(true)
                let token = await findUserByPhone(value);
                if(token) {
                  sendSmsVerification(formattedValue).then( () => {
                      setLoading(false)
                      navigation.navigate("OTP", { phoneNumber: formattedValue, token: token })
                    }
                  )

                } else {
                  willAlert('ไม่มีหมายเลขนี้ในระบบ','')
                  setLoading(false)
                }

  

              } catch (err) {

                willAlert('เกิดข้อผิดพลาดขึ้น',(err?.response?.data?.message) ? err?.response?.data?.message : err?.message)
                setLoading(false)
              } 
           }}
         >
           <Text style={styles.buttonText}>ยืนยันเบอร์โทรศัพท์</Text>
          </TouchableOpacity>
       </SafeAreaView>
       {loading && <LoadingScreen animating={loading}/>}
     </View>
   </>
 );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lighter,
  },
  topic: {
    color: 'dimgray',
    fontFamily: 'Mitr-Bold',
    fontSize: 20
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
  welcome: {
    padding: 20,
  },
});

export default Phone;