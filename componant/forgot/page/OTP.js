import React, { useState,useEffect } from "react";
import { 
  SafeAreaView, 
  StyleSheet, 
  Button, 
  Text,
  View 
} from "react-native";

import { sendSmsVerification,checkVerification } from "../../../controllers/verificationControllers";
import OTPInputView from "@twotalltotems/react-native-otp-input";

const OTP = ({ route, navigation }) => {
  const { phoneNumber,token } = route.params;
  const [invalidCode, setInvalidCode] = useState(false);
  const [timerCount, setTimer] = useState(60)
  useEffect(() => {

    let interval = setInterval(() => {
      setTimer(lastTimerCount => {
          lastTimerCount <= 1 && clearInterval(interval)
          return lastTimerCount - 1
      })
    }, 1000) //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval)
    }, []);




 return (
  <SafeAreaView style={styles.wrapper}>
    <Text style={styles.prompt}>กรุณากรอกหมายเลข OTP</Text>
    <Text style={styles.message}>
      {`รหัส OTP จะถูกส่งไปยังหมายเลข (${phoneNumber})`}
    </Text>
    <View style={{marginTop:15}}>
    <Button
      title= {(timerCount<=0) ? `ส่งอีกครั้ง` : `รอส่งอีกครั้ง ${timerCount}`}
      disabled={(timerCount<=0) ? false : true}
      onPress={async () => await sendSmsVerification(phoneNumber)}
    />
    </View>
    <OTPInputView
      style={{ width: "80%", height: 200 }}
      pinCount={6}
      autoFocusOnLoad
      
      codeInputFieldStyle={styles.underlineStyleBase}
      codeInputHighlightStyle={styles.underlineStyleHighLighted}
      onCodeFilled={async (code) => {
        checkVerification(phoneNumber, code).then((success) => {
        if (!success) 
          setInvalidCode(true);
        else
          navigation.navigate('ChangePassword',{token: token})
        });
      }}
    />
    {invalidCode && <Text style={styles.error}>รหัสไม่ถูกต้อง</Text>}
  </SafeAreaView>
 );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: "black",
    fontSize: 20,
  },
  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
  prompt: {
    fontSize: 24,
    paddingHorizontal: 30,
    paddingBottom: 20,
    color: "dimgray",
    fontFamily: 'Mitr-Regular'
  },
  message: {
    fontSize: 16,
    paddingHorizontal: 15,
    color: "dimgray",
    fontFamily: 'Mitr-Regular'
  },
  error: {
    color: "red",
    fontFamily: 'Mitr-Regular'
  },
});

export default OTP;