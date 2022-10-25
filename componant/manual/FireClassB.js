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

const FireClassB = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header
            navigation={navigation}
            title = {'คู่มือรับมือไฟไหม้ประเภท ข.'}
            color = {'orange'}
      />
    <ScrollView>
      <Tooltip
              backgroundColor={'lightgray'}
              containerStyle={{ width: 200, height: 100 }}
              popover={<Text>ที่มา : https://upload.wikimedia.org/wikipedia/commons/3/34/Fire_Class_B.svg</Text>}
      >  
        <View style={styles.pictureView}>
          <Image style={styles.picture}
            source={require('../../assets/manual/ClassBFire.png')}/>
        </View>
      </Tooltip>
      <View style={styles.postContent}>
        <Text style={styles.postTitle}>
          ไฟประเภท ข. (Class B. Fire)
        </Text>

        <Text style={styles.postDescription}>
          ลักษณะของไฟประเภท ข. (Class B.)   คือเป็นของเหลวที่มีไอระเหยสามารถติดไฟได้ (Flammable Liquids) ลุกไหม้เฉพาะผิวหน้า เช่น น้ำมันเชื้อเพลิง น้ำมันหล่อลื่น หรือจาระบี เมื่อลุกไหม้แล้วจะไม่มีเถ้าถ่านให้เห็น อันตรายจะมากขึ้นเมื่อบริเวณนั้นมีอุณหภูมิสูงซึ่งเป็นสาเหตุที่ทำให้เกิดไอระเหยมากขึ้น และสามารถลุกติดไฟได้อีก ถ้าไอระเหยของเชื้อเพลิงได้รับความร้อน จนถึงอุณหภูมิติดไฟของเชื้อเพลิงนั้น (ไฟคุ){"\n"} {"\n"}
          ลักษณะการลุกไหม้ของ ของเหลวไวไฟ {"\n"}
          1.จุดวาบไฟ (Flash Point) คือ อุณหภูมิต่ำสุดที่ทำให้ของเหลวปล่อยไอระเหยออกมาปริมาณมากพอที่จะทำให้เกิดเปลวไฟ ซึ่งไอระเหยเหล่านี้จะไปรวมกับอากาศ สามารถลุกติดไฟได้เมื่อมีเปลวไฟ หรือประกายไฟส่วนมากจะเกิดกับเชื้อเพลิงเหลว ส่วนเชื้อเพลิงประเภทอื่นไม่ค่อยพบเห็น {"\n"}{"\n"}
          2.จุดไวไฟ (ติดไฟ) (Fire Point) คือ อุณหภูมิต่ำสุดที่ทำให้ไอระเหยของเชื้อเพลิงผสมกับอากาศนั้นเกิดลุกเป็นไฟไหม้ต่อเนื่องๆได้ โดยอาศัยเปลวไฟเป็นตัวจุด จุดติดไฟจะมีอุณหภูมิสูงกว่าจุดวาบไฟ {"\n"}{"\n"}
          3.อุณหภูมิลุกไหม้ (อุณหภูมิติดไฟ) (Ignition Temperature) คือ อุณหภูมิต่ำสุดที่ทำให้ไอระเหยของวัตถุเชื้อเพลิงผสมกับอากาศพร้อมที่จะติดไฟได้เลยโดยไม่ต้องอาศัยเปลวไฟ หรือประกายไฟจากภายนอกเป็นตัวจุดอุณหภูมิที่ทำให้เกิดการลุกไหม้ขึ้นอยู่กับชนิดของของเหลวที่เป็นเชื้อเพลิง {"\n"}{"\n"}
          4.ช่วงการเกิดไฟหรือการระเบิด (Flammable or explosive range)  หมายถึงอัตราน้อยที่สุดจนถึงอัตรามากที่สุดของไอระเหยของของเหลวนั้นเข้าผสมกับอากาศซึ่งจะสามารถลุกไหม้หรือระเบิดได้เมื่อได้รับความร้อนจนถึงจุดติดไฟ อัตรานี้โดยทั่วไปจะวัดค่าเป็นเปอร์เซ็นต์ เช่น คาร์บอนไดซัลไฟด์ (Carbon disulfide) มีช่วงการระเบิด 1% ถึง 50 % หมายความว่าถ้าในอากาศมีคาร์บอน ไดซัลไฟด์ผสมอยู่เกิน 1 % แต่น้อยกว่า 50 % ณ อัตราส่วนผสมนี้ (ระหว่างอากาศกับคาร์บอน ไดซัลไฟด์) สามารถจะระเบิดหรือลุกไหม้ถ้ามีความร้อนเข้ามาสัมผัส {"\n"}{"\n"}
        </Text>
        <Tooltip
              backgroundColor={'lightgray'}
              containerStyle={{ width: 200, height: 100 }}
              popover={<Text>ที่มา : https://www.ntnsafety.com/images/editor/CLASS%20B.png</Text>}
        >  
          <View style={styles.pictureView}>
            <Image style={styles.picture2}
              source={require('../../assets/manual/ClassBFire2.png')}/>
          </View>
        </Tooltip>
        <Text style={styles.postDescription}>
          เชื้อเพลิงของไฟประเภท ข. (Class B.) มีจุวาบไฟต่ำกว่า 100 องศา ฟาเรนไฮด์ (37.8 องศาเซลเซียส) โดยมีความดันไอระเหยที่จุดวาบไฟน้อยกว่า 40 ปอนด์/ตรน.เบนซินที่ลุกไหม้จะให้ความร้อนสูงถึง 1500 องศาฟาเรนไฮด์ (816 องศาเซลเซียส) การดับไฟที่เกิดจากน้ำมันต้องใช้สารดับเพลิงที่สามารถทำให้วัตถุรอบๆ ที่ไหม้นั้นเย็นลงไปเรื่อยๆด้วย ไม่เช่นนั้นอุณหภูมิที่สูงขึ้นอาจจะลุกไหม้ขึ้นอีกในลักษณะไฟคุ {"\n"}{"\n"}
          ในการใช้คาร์บอนไดออกไซด์หรือไอน้ำดับไฟที่เกิดจากผลิตภัณฑ์ปิโตรเลียม จะทำให้ออกซิเจนในบรรยากาศลดลงจาก 20.8 % เหลือ 14 % ซึ่งเป็นระดับที่ผลิตภัณฑ์ปิโตรเลียม (เบนซิน) ไม่สามารถลุกไหม้ได้ {"\n"}{"\n"}
          สารดับเพลิงที่เหมาะสมและมีประสิทธิภาพดีที่สุด ได้แก่ โฟม (Foam) ประเภท Aqueous Foam (AFFF) ซึ่งเป็นโฟมที่พัฒนาใหม่ล่าสุด แต่ถ้าไฟที่เกิดจาก ก๊าซมีเทน, เกอโซลีน, หรือ ก๊าซ LPG. ซึ่งเป็นสารที่มีสารอื่นเพิ่มเข้ามา ซึ่งจัดอยู่ในวัตถุเชื้อเพลิงประเภท ไฮโดรคาร์บอนที่มีO2 หรือ ไนโตรเจน N2 ตัวใดตัวหนึ่งผสมอยู่เนื้อสาร ซึ่งเป็นสารละลายในน้ำ (มีน้ำผสมอยู่) จะมีผลออกฤทธิ์ช้าสำหรับ AFFF Foam {"\n"}{"\n"} 
          หลักการทั่วไปหากหากเชื้อเพลิงมีสารละลายในน้ำผสมอยู่ 12 - 15 % ต้องใช้โฟมประเภท ABC คลุมผิวหน้าเชื้อเพลิงเพื่อทำการดับไฟ
        </Text>

        <Text style={styles.tags}>
          ข้อควรระวัง สำหรับการดับไฟประเภท ข. (Class B.)
          1.ห้ามใช้เป็นลำฉีดไปที่ผิวหน้าของเชื้อเพลิง เพราะจะทำให้ไฟแพร่กระจายจากการกระเด็นกระดอนของเชื้อเพลิง {"\n"}
          2.ใช้ ซีโอทู (CO2) คลุมไฟไว้ชั่วคราว ไฟอาจจะลุกไหม้ขึ้นมาอีกได้หากความร้อนที่สะสมเพิ่มขึ้นจนถึงจุดติดไฟ (ไฟคุ) {"\n"}
          3.ใช้ฟองโฟมไม่ได้ผลสำหรับไฟขนาดใหญ่ หรือวัตถุเชื้อเพลิงที่มีไอระเหยเร็ว {"\n"}
          4.ฟองโฟมเหมาะสำหรับวัตถุเชื้อเพลิงที่อยู่ในภาชนะหรือไฟขนาดเล็กหรือน้ำมันเชื้อ {"\n"}
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

export default FireClassB;