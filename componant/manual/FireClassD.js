import React, { Component , useCallback } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert
} from 'react-native';
import { Tooltip, Text, colors } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../subComponant/Header'

const supportedURL = "https://sahasupply.co.th/%E0%B8%9A%E0%B8%97%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1/%E0%B8%8A%E0%B8%B1%E0%B9%89%E0%B8%99%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B9%84%E0%B8%9F%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%83%E0%B8%8A%E0%B9%89%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%94%E0%B8%B1%E0%B8%9A%E0%B9%84%E0%B8%9F-(Classification-of-fires-and-appropriate-extinguishing-agents)/?fbclid=IwAR174tMUKVD-RyVCxV6rMdlyBWlpJEG4JhBJAQoTNgGtjK_EmyyHWcZCbOw";

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <TouchableOpacity style = {styles.backButton}
  onPress={handlePress}>
    <Text>{children}</Text>
  </TouchableOpacity>;
};

const FireClassD = ({navigation}) => {


  return (
      <View style={styles.container}>
        <Header
            navigation={navigation}
            title = {'คู่มือรับมือไฟไหม้ประเภท ง.'}
            color = {'orange'}
        />
      <ScrollView>
        <Tooltip
              backgroundColor={'lightgray'}
              containerStyle={{ width: 200, height: 100 }}
              popover={<Text>ที่มา : https://upload.wikimedia.org/wikipedia/commons/0/0c/Fire_Class_D.svg</Text>}
        >
          <View style={styles.pictureView}>
            <Image style={styles.picture}
              source={require('../../assets/manual/ClassDFire.png')}/>
          </View>
        </Tooltip>
        <View style={styles.postContent}>
          <Text style={styles.postTitle}>
            ไฟประเภท ง. หรือไฟพิเศษ (Class D.Fire)
          </Text>

          <Text style={styles.postDescription}>
            เป็นไฟที่เกิดขึ้นจากโลหะติดไฟ (Combustible Metals) เชนแมกนีเซียม ไททาเนียม โซเดียม และอลูมิเนียม
            ในการแบ่งไฟออกเป็นประเภทของ นั้น ผลแห่งการแบ่งตามลักษณะของวัตถุเชื้อเพลิงที่ติดไฟ เพื่อประโยชน์ในการหาเครื่องมือ-อุปกรณ์
            มาดับเพลิงที่เกิดจากไฟแต่ละประเภทได้ แต่วัตถุเชื้อเพลิงบางชนิดไม่สามารถจะหาหรือกำหนดเครื่องมือ-อุปกรณ์และวิธีการมาทำการดับเพลิงที่เกิดขึ้นได้โดยตรง 
            วัตถุเชื้อเพลิงดังกล่าว ได้แก่ {"\n"}</Text>
        <Tooltip
              backgroundColor={'lightgray'}
              containerStyle={{ width: 200, height: 100 }}
              popover={<Text>ที่มา : https://www.ntnsafety.com/images/editor/CLASS_D.png</Text>}
        >
          <View style={styles.pictureView}>
            <Image style={styles.picture2}
              source={require('../../assets/manual/ClassDFire2.png')}/>
          </View>
        </Tooltip>
        <Text style={styles.postDescription}>
          1.ประเภทของแข็ง ได้แก่ แมกนีเซียม (Ng), เทอร์ไมท์ โซเดียม (Na), ฟอสฟอรัส (P), นาปาล์ม เป็นต้น {"\n"}
          2.ประเภทของเหลว ได้แก่ ออกซิเจนเหลว, น้ำมันเชื้อเพลิงไวไฟ, น้ำมันเชื้อเพลิงหนัก หรือน้ำมันหุงต้ม, น้ำมันไฮโดรลิคส์, สารละลาย ฯลฯ {"\n"}
          3.ประเภทก๊าซ ได้แก่ ออกซิเจน, ไฮโดรเจน, ก๊าซหุงต้ม (LPG.), ก๊าซอะเซททีลีน (C2H2) เป็นต้น {"\n"}
        </Text>

        <Text style={styles.tags}>
          การดับไฟที่เกิดกับไฟประเภท ง. (Class D.) {"\n"}  
          ไม่สามารถที่จะกำหนดวิธีการเฉพาะเจาะจงลงไปได้เหมือนกับไฟประเภทอื่นๆ การดับไฟจำเป็นจะต้องใช้เทคนิคพิเศษที่สามารถเลือกใช้เครื่องมือ-อุปกรณ์และวิธีการให้สอดคล้องกับประเภทของวัตถุเชื้อเพลิง การใช้สารดับเพลิงธรรมดาที่มีไว้ใช้กับไฟ Class อื่นๆ จะเป็นอันตรายจากการเกิดปฏิกิริยา ซึ่งจะทำให้เกิดการแตกตัว ระเบิด ก๊าซพิษ ได้สารที่พอจะใช้ระงับไฟในเบื้องต้น ได้แก่ ผงเคมี (Dry chemical) ถ้าการใช้เครื่องมือ-อุปกรณ์ในการดับไฟอื่นๆ ไม่ได้ผลหรือเกิดอันตราย ทรายแห้งสามารถนำมาดับไฟ Class D ได้อย่างปลอดภัย เพราะจะไม่เกิดปฏิกิริยา สามารถสกัดกั้นการระเหยคลายไอและสกัดกั้นออกซิเจน (O2) ไม่ให้เข้าไปเสริมให้การลุกไหม้ต่อเนื่องได้ {"\n"}
        </Text>
        </View>
      </ScrollView>
      <View style = {styles.borderButton}>
        <OpenURLButton url={supportedURL}><Text style={{fontSize:18,fontFamily: 'Mitr-Regular'}}>บทความอ้างอิง</Text></OpenURLButton>
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
  postContent: {
    flex: 1,
    padding:30,
  },
  postTitle:{
    fontSize:26,
    fontFamily: 'Mitr-Bold'
  },
  postDescription:{
    fontSize:16,
    marginTop:10,
    fontFamily: 'Mitr-Regular'
  },
  tags:{
    color: '#8F00FF',
    marginTop:10,
    fontFamily: 'Mitr-Regular'
  },
  date:{
    color: '#696969',
    marginTop:10,
    fontFamily: 'Mitr-Regular'
  },
  picture: {
    width: 280,
    height: 300,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: "#00BFFF",
  },
  picture2: {
    width: 310,
    height: 150,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: "#00BFFF",
  },
  pictureView:{
    flexDirection: 'row',
    marginTop:20,
    justifyContent :'center'
  },
  backButton: {
    margin:20,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: '#50C878',
  },
  borderButton : {
    borderTopWidth : 1,
    borderColor : 'green'
  }
})

export default FireClassD;