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

const supportedURL = "https://www.bangkokbiznews.com/news/detail/714464";

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

const Earthquake = ({navigation}) => {

    return (
        <View style={styles.container}>
          <Header
                navigation={navigation}
                title = {'คู่มือรับมือแผ่นดินไหว'}
                color = {'peru'}
          />
        <ScrollView>

          <View style={styles.postContent}>
            <Tooltip
                    backgroundColor={'lightgray'}
                    containerStyle={{ width: 200, height: 100 }}
                    popover={<Text>ที่มา : https://researchcafe.org/wp-content/uploads/2020/04/thumbnail_earthquake.png</Text>}
              >  
                <View style={styles.pictureView}>
                  <Image style={styles.picture}
                    source={require('../../assets/manual/earthquake.jpg')}/>
                </View>
            </Tooltip>

          <Text style={styles.postDescription}>
              <Text style = {{fontFamily: 'Mitr-Bold'}}>ข้อควรปฏิบัติ ขณะเกิดแผ่นดินไหว</Text> {"\n"}
              1.อย่าตื่นตกใจ พยายามควบคุมสติ อย่าตื่นตระหนก {"\n"}
              2.กรณีอยู่ในบ้าน ให้อยู่ห่างจากประตู ระเบียง และหน้าต่าง {"\n"}
              3.กรณีอยู่ในอาคาร หาที่หลบที่ปลอดภัย เช่น หมอบใต้โต๊ะ หรือจุดที่มีโครงสร้างแข้งแรง {"\n"}
              4.ถ้าอยู่ในที่โล่งแจ้ง ให้อยู่ห่างจากเสาไฟฟ้า ป้ายโฆษณา อาคาร และสิ่งห้อยแขวนต่างๆ {"\n"}
              5.อย่าใช้สิ่งที่ทำให้เกิดประกายไฟ เพราะอาจมีแก๊สรั่วอยู่บริเวณนั้น {"\n"}
              6.หากกำลังขับรถ ให้หยุดรถในบริเวณที่ปลอดภัย {"\n"}
              7.ห้ามในลิฟต์โดยเด็ดขาด ขณะเกิดแผ่นดินไหว {"\n"}
              8.กรณีอยู่ชายทะเล หากสังเกตเห็นน้ำทะเลลดระดับรวดเร็ว ให้รีบหนีขึ้นที่สูง เพราะอาจเกิดสึนามิ {"\n"} {"\n"} 
          </Text>
          <Tooltip
                  backgroundColor={'lightgray'}
                  containerStyle={{ width: 200, height: 100 }}
                  popover={<Text>ที่มา : https://image.bangkokbiznews.com/image/kt/media/image/news/2015/07/30/658863/640x390_658863_1438254690.jpg?x-image-process=style/LG-webp</Text>}
            >  
              <View style={styles.pictureView}>
                <Image style={styles.picture}
                  source={require('../../assets/manual/Earthquake1.png')}/>
              </View>
          </Tooltip>

          <Text style={styles.postDescription}>
            <Text style = {{fontFamily: 'Mitr-Bold'}}>ข้อควรปฏิบัติ หลังเกิดแผ่นดินไหว</Text> {"\n"}
              1.ควรตรวจตัวเองและคนข้างเคียง ว่าได้รับบาดเจ็บหรือไม่ {"\n"}
              2.ควรรีบออกจากอาคารที่เสียหายทันที {"\n"}
              3.ใส่รองเท้าหุ้มส้นเสมอ เพราะอาจมีวัสดุแหลมคมแทงได้ {"\n"}
              4.ตรวจสายไฟ ท่อน้ำ ท่อแก๊ส {"\n"}
              5.ออกจากบริเวณที่สายไฟขาด {"\n"}
              6.เปิดวิทยุ ทีวี ฟังคำแนะนำฉุกเฉิน {"\n"}
              7.สำรวจความเสียหายของท่อส้วม และท่อน้ำทิ้งก่อนใช้ {"\n"}
              8.อย่าเป็นไทยมุง หรือเข้าไปในเขตที่มีความเสียหายสูง {"\n"}
              9.อย่าแพร่ข่าวลือ หรือหลงเชื่อข่าวลือ {"\n"} {"\n"}
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
        fontFamily: 'Mitr-Regular'
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

export default Earthquake;