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


const FireClassA = ({navigation}) => {

    return (
        <View style={styles.container}>
          <Header
                navigation={navigation}
                title = {'คู่มือรับมือไฟไหม้ประเภท ก.'}
                color = {'orange'}
          />
        <ScrollView>
          <Tooltip
                backgroundColor={'lightgray'}
                containerStyle={{ width: 200, height: 100 }}
                popover={<Text>ที่มา : https://upload.wikimedia.org/wikipedia/commons/4/44/Fire_Class_A.svg</Text>}
          >  
            <View style={styles.pictureView}>
              <Image style={styles.picture}
                source={require('../../assets/manual/ClassAFire.png')}/>
            </View>
          </Tooltip>
          <View style={styles.postContent}>
            <Text style={styles.postTitle}>
              ไฟประเภท ก. (Class A. Fire)
            </Text>

            <Text style={styles.postDescription}>
              ลักษณะของไฟประเภท ก. (Class A.) เป็นของแข็ง ลุกไหม้ถึงแกนใน เมื่อไหม้หมดแล้วมีเถ้าถ่านเหลืออยู่ เถ้าถ่านที่ร้อนนี้ถ้ามีออกซิเจน(O2) เข้าไปเสริม มักจะติดไฟขึ้นไหม้ได้อีก มีการเผาไหม้ 2 ระดับ
              ระดับที่ 1 ระดับเปลวไฟ  (Flaming Combustion) เป็นช่วงแรกที่มีการเผาไหม้ให้เกิดเป็น ไอระเหย ปล่อยออกมาจากวัตถุเชื้อเพลิงเมื่อถูกความร้อนไปกระตุ้นจนเกิดเป็นไอ (ช่วง Oxidation) ลอยออกมาสัมผัสความร้อนลุกเป็นเปลวไฟ
              ระดับที่ 2 ระดับลุกไหม้เต็มที่ (Glowing Combustion Deep-seat) ในระดับนี้เปลวเพลิงจะถูกควบคุมโดยไอระเหยของวัตถุเชื้อเพลิงที่ฟุ้งกระจายไปผสมกับออกซิเจนในอากาศ ซึ่งตอนนี้ออกซิเจนจะแทรกซึมเข้าไปถึงเนื้อในของวัตถุเชื้อเพลิงทำให้เกิดการลุกไหม้เผาวัตถุเชื้อเพลิงให้คลายไอออกมา ถ้าความร้อนลดน้อยลง (เปลวจะลดความสูงลง) หมายความว่าวัตถุเชื้อเพลิงมีอากาศเข้าไปเสริมลดลงให้เพียงพอที่จะทำให้วัตถุเชื้อเพลิงนั้นคลายไอออกมาได้อีกต่อไป 
            </Text>
            <Tooltip
                  backgroundColor={'lightgray'}
                  containerStyle={{ width: 200, height: 100 }}
                  popover={<Text>ที่มา : https://www.ntnsafety.com/images/editor/CLASS_A.png</Text>}
            >  
              <View style={styles.pictureView}>
                <Image style={styles.picture2}
                  source={require('../../assets/manual/ClassAFire2.png')}/>
              </View>
            </Tooltip>

          <Text style={styles.postDescription}>
            {"\n"} ตัวอย่างของวัตถุเชื้อเพลิงของไฟประเภท ก. (Class A){"\n"}
              - ไม้ หรือวัสดุที่ผลิตจากไม้ {"\n"}
              - ฝ้าย และสารที่ผลิตจากฝ้าย {"\n"}
              - ดินระเบิด {"\n"}
              - กระดาษ {"\n"}
              - ยางและสารที่ผลิตจากยาง {"\n"}
          </Text>

          <Text style={styles.tags}>
            วิธีการดับไฟที่เกิดจากวัตถุเชื้อเพลิงประเภท ก.
            ส่วนมากจะใช้วิธีการลดอุณหภูมิ โดยลดอุณหภูมิของสิ่งที่ไหม้ไฟให้ต่ำกว่าจุดติดไฟของมัน มีวิธีการดำเนินการได้ ดังนี้
            1.ใช้ฝอยน้ำดับเปลวไฟ {"\n"}
            2.ใช้น้ำฉีดเป็นลำเพื่อทะลุทะลวงให้วัตถุเชื้อเพลิงกระจายออก เพื่อให้รวดเร็วในการดับ {"\n"}
            3.ใช้น้ำฉีดวัตถุที่กระจายให้เปียกโชก เพื่อป้องกันไฟคุการดับไฟโดยวิธีคลุมไฟใช้ไม่ได้ผลสำหรับไฟประเภท ก. เพราะเมื่อเกิดเพลิงไหม้ถึงแกนในยากที่จะคลุมได้ทั่วถึง              </Text>
          </View>
        </ScrollView>
          <View style = {styles.borderButton}>
            <OpenURLButton 
            url={supportedURL}><Text style={{fontSize:18,fontFamily: 'Mitr-Regular'}}>บทความอ้างอิง</Text></OpenURLButton>
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

export default FireClassA;