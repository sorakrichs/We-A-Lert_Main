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

const FireClassC = ({navigation}) => {

  return (
      <View style={styles.container}>
        <Header
            navigation={navigation}
            title = {'คู่มือรับมือไฟไหม้ประเภท ค.'}
            color = {'orange'}
        />
      <ScrollView>
        <Tooltip
              backgroundColor={'lightgray'}
              containerStyle={{ width: 200, height: 100 }}
              popover={<Text>ที่มา : https://upload.wikimedia.org/wikipedia/commons/f/f7/Fire_Class_C.svg</Text>}
        >
          <View style={styles.pictureView}>
              <Image style={styles.picture}
                source={require('../../assets/manual/ClassCFire.png')}/>
          </View>
        </Tooltip>
        <View style={styles.postContent}>
            <Text style={styles.postTitle}>
              ไฟประเภท ค. (Class C. Fire)
            </Text>
            <Text style={styles.postDescription}>
              ได้แก่ ไฟที่เกิดขึ้นกับเครื่องมือและอุปกรณ์ไฟฟ้าที่ยังมีกระแสไฟฟ้าไหลอยู่ สาเหตุของการเกิดไฟไหม้ 
              เนื่องจาก {"\n"}
              1.ไฟฟ้าลัดวงจร {"\n"}
              2.ใช้ไฟฟ้าเกินกำลัง {"\n"}
              3.การพันหรือต่อสายไฟไม่ถูกต้อง {"\n"}
              4.ใช้ฉนวนกันไฟบางเกินไปหรือไม่ได้ขนาด {"\n"}{"\n"}
            </Text>
          <Tooltip
              backgroundColor={'lightgray'}
              containerStyle={{ width: 200, height: 100 }}
              popover={<Text>ที่มา : https://www.ntnsafety.com/images/editor/CLASS%20C.png</Text>}
          >  
            <View style={styles.pictureView}>
                <Image style={styles.picture2}
                  source={require('../../assets/manual/ClassCFire2.png')}/>
            </View>
          </Tooltip>
         <Text style={styles.postDescription}>        
            ตัวอย่างของไฟประเภท ค. (Class C.)  ได้แก่ ไฟไหม้เครื่องวิทยุ แผงจ่ายไฟ , เครื่องไฟฟ้า, หม้อแปลงไฟ, ตู้แยกไฟฟ้าต่างๆเป็นต้น
            วิธีการดับไฟที่เกิดกับไฟประเภท ค. สามารถทำการดับไฟได้โดยการกั้นออกซิเจน โดยการใช้สารดับเพลิงที่ไม่เป็นสื่อไฟฟ้า เช่น ผงเคมีแห้ง , แก๊สคาร์บอนไดออกไซด์ (CO2)
          </Text>

          <Text style={styles.tags}>
            ข้อควรระวังในการดับไฟประเภท ค. (Class C.) {"\n"}
            1.ต้องตัดวงจรไฟฟ้าก่อนเสมอ {"\n"}
            2.จัดเจ้าหน้าที่คอยตรวจสอบระบบไฟฟ้า {"\n"}
            3.สวมรองเท้ายาง ถุงมือเพื่อป้องกันไฟฟ้า {"\n"}
            4.ห้ามใช้น้ำเป็นลำ ถ้าจำเป็นต้องใช้น้ำจะต้องใช้เป็นฝอย และควรฉีดระยะไกลกว่า 5
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
    fontFamily: 'Mitr-Regular'
  },
  borderButton : {
    borderTopWidth : 1,
    borderColor : 'green'
  }
})

export default FireClassC;