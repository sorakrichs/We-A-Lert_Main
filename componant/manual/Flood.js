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

const supportedURL = "https://www.bangkokbiznews.com/lifestyle/962382";

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

const Flood = ({navigation}) => {

    return (
        <View style={styles.container}>
          <Header
                navigation={navigation}
                title = {'คู่มือรับมือน้ำท่วม'}
                color = {'turquoise'}
          />
        <ScrollView>
          <View style={styles.postContent}>
          <Tooltip
                backgroundColor={'lightgray'}
                containerStyle={{ width: 200, height: 110 }}
                popover={<Text>ที่มา : https://static.thairath.co.th/media/Dtbezn3nNUxytg04aYmTYUrIHaWFwCNyTVAAz7LRWTNya3.png</Text>}
          >
            <View style={styles.pictureView}>
              <Image style={styles.picture}
                source={require('../../assets/manual/Flood1.png')}/>
            </View>
          </Tooltip>
          <Text style={styles.postDescription}>
            1. เตรียมพร้อม ติดตาม เฝ้าระวัง {"\n"}  
            - สังเกตระดับน้ำ ติดตามข่าวประกาศแจ้งเตือน {"\n"}  
            - เตรียมยกของขึ้นที่สูง {"\n"}  
            - หากมีการแจ้งอพยพ ให้รีบอพยพทันที {"\n"}  
            - เตรียมอพยพสัตว์เลี้ยงไว้ในที่สูง	 {"\n"}  {"\n"} 
          </Text>
          <Tooltip
                backgroundColor={'lightgray'}
                containerStyle={{ width: 200, height: 110 }}
                popover={<Text>ที่มา : https://cdn-cms.pgimgs.com/static/2019/06/Flood-in-Bangkok-should-know-before-buy-house.jpg</Text>}
          >
            <View style={styles.pictureView}>
              <Image style={styles.picture}
                source={require('../../assets/manual/Flood2.jpg')}/>
            </View>
          </Tooltip>
          <Text style={styles.postDescription}>
            2. เมื่อเกิดน้ำท่วม {"\n"}  
            - รีบแจ้ง อบต./กำนัน/ผู้ใหญ่บ้าน หรือแจ้ง 1784 {"\n"}  
            - ระมัดระวังการใช้อุปกรณ์ไฟฟ้า {"\n"}  
            - ไม่ให้เด็กไปเล่นน้ำในพื้นที่น้ำท่วม/น้ำหลาก {"\n"}  
            - เลี่ยงการขับรถไปในเส้นทางน้ำท่วม{"\n"}  {"\n"}  
          </Text>
          <Tooltip
                backgroundColor={'lightgray'}
                containerStyle={{ width: 220, height: 130 }}
                popover={<Text>ที่มา : https://promotions.co.th/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2021/09/flood-assistance-number-1.jpg.webp</Text>}
          >
            <View style={styles.pictureView}>
              <Image style={styles.picture}
                source={require('../../assets/manual/Flood3.jpg')}/>
            </View>
          </Tooltip>
          <Text style={styles.postDescription}>
            3. แจ้งเหตุน้ำท่วม {"\n"}  
            กรมป้องกันและบรรเทาสาธารณภัยเตือนคนไทยในพื้นที่ฝนตกหนัก ฝนตกต่อเนื่อง ระดับน้ำขึ้นสูง ให้ติดตามข่าวสารและเฝ้าระวังภัย “น้ำท่วม” พร้อมแจ้งเหตุเมื่อพบอุทกภัย ได้ 24 ชม.{"\n"}  
            - สายด่วนนิรภัย โทร.1784{"\n"}  
            - สถาบันการแพทย์ฉุกเฉินแห่งชาติ โทร.1669{"\n"}  {"\n"} 
          </Text>
          <Tooltip
                backgroundColor={'lightgray'}
                containerStyle={{ width: 200, height: 110 }}
                popover={<Text>ที่มา : https://thethaiger.com/th/wp-content/uploads/sites/9/2020/05/weather-today-4-may.jpg</Text>}
          >
            <View style={styles.pictureView}>
              <Image style={styles.picture}
                source={require('../../assets/manual/Flood4.jpg')}/>
            </View>
          </Tooltip>
            <Text style={styles.postDescription}>
              ขอให้ประชาชนติดตามข้อมูลสภาพอากาศและข่าวสารจากทางราชการ พื้นที่เฝ้าระวังและติดตามสถานการณ์ฝนตกหนัก ปริมาณฝนสะสม โดยเฉพาะพื้นที่ชุมชนเมืองอาจได้รับผลกระทบจากน้ำท่วมขังระยะสั้นๆ พื้นที่ลุ่มต่ำ พื้นที่ลาดเชิงเขา อาจเกิดน้ำท่วมฉับพลันและน้ำป่าไหลหลาก
              รวมทั้งอาจเกิดดินถล่ม พื้นที่ริมลำน้ำ อาจได้รับผลกระทบจากน้ำล้นตลิ่งและน้ำท่วมในระดับสูง ระวังอันตรายจากสัตว์และแมลงมีพิษ อันตรายจากกระแสไฟฟ้า รวมทั้งการขับขี่พาหนะบริเวณน้ำไหลผ่านเส้นทาง
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
      fontFamily: 'Mitr-Bold',
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
      width: 350,
      height: 200,
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
    },
})

export default Flood;