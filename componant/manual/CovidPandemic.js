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

const supportedURL = "https://www.025798899.com/news/1860";

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

const CovidPandemic = ({navigation}) => {

    return (
        <View style={styles.container}>
          <Header
                navigation={navigation}
                title = {'คู่มือรับมือโรคระบาด (Covid-19)'}
                color = {'limegreen'}
          />
        <ScrollView>
          <Tooltip
            backgroundColor={'lightgray'}
            containerStyle={{ width: 200, height: 100 }}
            popover={<Text>ที่มา : https://www.025798899.com/uploads/contents/20200410094504fHNgxjI.jpg</Text>}
          >  
                <View style={styles.pictureView}>
                  <Image style={styles.picture}
                    source={require('../../assets/manual/CovidPandemic.jpg')}/>
                </View>
          </Tooltip>
          <View style={styles.postContent}>
              <Text style={styles.postTitle}>
                โรคระบาด COVID-19
              </Text>

              <Text style={styles.postDescription}>
                1 .ใส่หน้ากากอนามัย และล้างมือบ่อย ๆ ด้วยสบู่ อย่างน้อย 30 วินาที หากไม่สะดวกควรใช้แอลกอฮอล์เจลหรือสเปรย์ {"\n"}
                2. พักผ่อนให้เพียงพออย่างน้อย 8-9 ช.ม.ต่อวัน และเข้านอนก่อน 4 ทุ่ม เพื่อเสริมภูมิต้านทาน {"\n"}
                3. ทานอาหารปรุงสุก สะอาด และใช้ช้อนกลางทุกครั้ง {"\n"}
                4. ทานอาหารที่อุดมไปด้วยสารต้านอนุมูลอิสระ เช่น ผัก ผลไม้หลากสี รวมถึงอาหารเสริม อาทิ ถั่งเช่า เห็ดหลินจือ วิตามิน C และ E  เป็นต้น {"\n"}
                5. เลี่ยงการเดินทางไปในพื้นที่เสี่ยง, แออัด และมีคนจำนวนมาก {"\n"}
                6. ออกกำลังกายสม่ำเสมอ {"\n"}
                7. ลดความเครียด เพราะความเครียดทำให้การทำงานของภูมิคุ้มกัน (NK Cell Activity) ลดลง {"\n"}
                8. ปรึกษาแพทย์ผู้ชำนาญการ เพื่อตรวจการทำงานของระบบภูมิคุ้มกัน (NK Cell Activity) ว่าอยู่ในระดับปกติหรือไม่ {"\n"}
                หากพบว่ามีอาการทางระบบหายใจ เช่น ไอ น้ำมูก หอบเหนื่อย และมีไข้ ควรรีบติดต่อขอเข้ารับการตรวจเพื่อรับการรักษาตามขั้นตอนต่อไป {"\n"}
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
    backButtonText:{
      color: "#FFFFFF",
      fontSize:20,
    },
    borderButton : {
      borderTopWidth : 1,
      borderColor : 'green'
    },
})

export default CovidPandemic;