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

const supportedURL = "https://www.tipinsure.com/NewsAndActivities/news_content_v3/%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%B1%E0%B8%99%E0%B8%A0%E0%B8%B1%E0%B8%A2/10%20%E0%B8%AA%E0%B8%B4%E0%B9%88%E0%B8%87%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%84%E0%B8%A7%E0%B8%A3%E0%B8%97%E0%B8%B3%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B9%80%E0%B8%81%E0%B8%B4%E0%B8%94%E0%B8%AD%E0%B8%B8%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%B4%E0%B9%80%E0%B8%AB%E0%B8%95%E0%B8%B8%20%E0%B9%81%E0%B8%A5%E0%B9%89%E0%B8%A7%E0%B8%88%E0%B8%B0%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B9%80%E0%B8%AA%E0%B8%B5%E0%B8%A2%E0%B9%80%E0%B8%9B%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%9A%E0%B8%84%E0%B8%B9%E0%B9%88%E0%B8%81%E0%B8%A3%E0%B8%93%E0%B8%B5";

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

const Accident = ({navigation}) => {

    return (
        <View style={styles.container}>
          <Header
                navigation={navigation}
                title = {'คู่มือรับมืออุบัติเหตุ'}
                color = {'violet'}
          />
        <ScrollView>
        <Tooltip
            backgroundColor={'lightgray'}
            containerStyle={{ width: 200, height: 100 }}
            popover={<Text>ที่มา : https://www.tsi.co.th/storage/compensation/September2018/CrNUt1tWy1tGea7GZzDb.jpg</Text>}
          >  
                <View style={styles.pictureView}>
                  <Image style={styles.picture}
                    source={require('../../assets/manual/Accident.jpg')}/>
                </View>
          </Tooltip>
          <View style={styles.postContent}>
              <Text style={styles.postTitle}>
                10 สิ่งที่ควรทำเมื่อเกิดอุบัติเหตุ แล้วจะไม่เสียเปรียบคู่กรณี
              </Text>
              <Text style={styles.postDescription}>
              <Text style = {{fontFamily: 'Mitr-Bold'}}>1.หยุดรถ</Text> {"\n"}
                ให้หยุดรถทันทีแม้จะเป็นอุบัติเหตุเล็กน้อย อย่าเลื่อนรถจนกว่าจะตกลงกันได้ว่า ใครเป็นคนผิด หรือถ้าจะให้ดีควรรอให้เจ้าหน้าที่ตำรวจมาตีเส้นอุบัติเหตุก่อน เว้นแต่เกิดอุบัติเหตุในที่เปลี่ยว ให้จดเลขทะเบียนรถคู่กรณี สีรถ ยี่ห้อ ตำหนิ เวลาและสถานที่เกิดเหตุไว้ แล้วขับต่อไปเรื่อยๆจนกว่าจะถึงที่ชุมชนหรือพบเจ้าหน้าที่ตำรวจ{"\n"}
              <Text style = {{fontFamily: 'Mitr-Bold'}}>2.อย่าพูดพล่อย</Text> {"\n"}
                ถ้ายังไม่แน่ใจว่าใครเป็นฝ่ายผิด การขอโทษของคุณอาจเป็นเหตุให้อีกฝ่ายหนึ่งอ้างได้ว่า คุณยอมรับเป็นฝ่ายผิด อีกทั้งไม่ควรกล่าวโทษอีกฝ่าย การกล่าวโทษคู่กรณีอาจทำให้สถานการณ์เลวร้ายลงไปอีก จำไว้ว่าคุณไม่มีอำนาจตัดสินว่าใครผิดใครถูก รอให้เจ้าหน้าที่เคลมประกันที่คุณทำประกันภัยรถยนต์มาช่วยดูที่เกิดเหตุก่อนก็ดี{"\n"}
              <Text style = {{fontFamily: 'Mitr-Bold'}}>3.ให้ข้อมูล</Text> {"\n"}
                ควรให้ข้อมูลเกี่ยวกับตัวคุณ ชื่อ ที่อยู่ เลขทะเบียนรถและชื่อประกันที่คุณมี แก่คู่กรณีหรือเจ้าหน้าที่ตำรวจ{"\n"}
              <Text style = {{fontFamily: 'Mitr-Bold'}}>4.หาข้อมูล</Text> {"\n"}
                ควรขอข้อมูลจากคู่กรณีด้วย หากอีกฝ่ายไม่ให้ ก็ให้จดรูปพรรณและเลขทะเบียนรถไว้  อย่าพยายามยึดใบขับขี่ของคู่กรณีไว้ เพราะคุณอาจโดนข้อหาลักทรัพย์{"\n"}
              <Text style = {{fontFamily: 'Mitr-Bold'}}>5.แจ้งตำรวจ</Text> {"\n"}
                แม้เป็นเพียงอุบัติเหตุเล็กน้อย หรืออีกฝ่ายยอมรับผิดก็ตาม มิฉะนั้นแล้วหากอีกฝ่ายแจ้งความในภายหลัง เจ้าหน้าที่จะสรุปว่าคุณเป็นฝ่ายหลบหนีและคุณจะเป็นฝ่ายผิดทุกกรณี หากเจ้าหน้าที่ยังไม่มาให้คุณไปแจ้งความที่สถานีตำรวจ เพื่อให้เจ้าหน้าที่ดูที่เกิดเหตุ และตีเส้นตำแหน่งรถ หากไม่สามรถติดต่อเจ้าหน้าที่ได้ ให้คุณทำหนังสือยืนยันเหตุการณ์ที่เกิดขึ้นไว้เป็นหลักฐาน
                โดยลงชื่อยืนยันไว้ทั้งสองฝ่าย อย่าหลงเชื่อคู่กรณี หากอีกฝ่ายบอกว่าไม่ต้องแจ้งตำรวจ เพราะอีกฝ่ายอาจปฏิเสธความรับผิดชอบในภายหลัง หากคุณไม่มีเจ้าหน้าที่เป็นพยาน หรือหนังสือยืนยัน ตามกฏหมายจะถือว่าคำพูดของคุณอ่อนหลักฐาน{"\n"}
              <Text style = {{fontFamily: 'Mitr-Bold'}}>6.หาพยาน</Text> {"\n"}
                สอบถามจากคนในบริเวณที่เกิดเหตุ อาจเป็นคนเดินถนน หรือรถคันข้างๆ หากเขายินยอมเป็นพยานให้คุณจดชื่อและที่อยู่ หมายเลขโทรศัพท์เพื่อติดต่อเอาไว้{"\n"}
              <Text style = {{fontFamily: 'Mitr-Bold'}}>7.ไปโรงพยาบาล</Text> {"\n"}
                หากคุณสงสัยว่าได้รับบาดเจ็บควรไปพบแพทย์ หากปล่อยไว้อาจจะเป็นอันตรายและการเรียกร้องค่าเสียหายในภายหลังจะยากขึ้นด้วย{"\n"}
              <Text style = {{fontFamily: 'Mitr-Bold'}}>8.แจ้งความ</Text> {"\n"}
                ในกรณีที่มีผู้บาดเจ็บหรือเสียชีวิตให้รีบแจ้งความทันที แม้กฎหมายจะผ่อนปรนให้แจ้งความในเวลา 6 เดือน เพราะ บริษัทประกันรถยนต์ส่วนใหญ่ไม่รับใบแจ้งความย้อนหลัง{"\n"}
              <Text style = {{fontFamily: 'Mitr-Bold'}}>9.ตกลงเงื่อนไขการจ่ายค่าเสียหาย</Text> {"\n"}
                เรียกเจ้าหน้าที่ประกันภัยมาทันทีหลังเกิดเหตุ เจ้าหน้าที่สามารถช่วยแนะนำคุณได้ว่าควรให้บริษัทชดใช้ หรือคุณควรจะจ่ายเอง{"\n"}
              <Text style = {{fontFamily: 'Mitr-Bold'}}>10.อย่ารีบรอมชอม</Text> {"\n"}
                หลังอุบัติเหตุหากอีกฝ่ายเป็นฝ่ายยอมรับผิด และคุณสงสัยว่าคุณจะได้รับบาดเจ็บ อย่าเพิ่งรีบรับข้อเสนอให้ยอมความ เพราะการบาดเจ็บอาจต้องใช้เวลาสักพักกว่าจะรู้อาการ หากคุณยอมความไปแล้ว การเรียกร้องค่าเสียหายเพิ่มเติมจะทำได้ยากขึ้น{"\n"}
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
      fontSize:24,
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

export default Accident;