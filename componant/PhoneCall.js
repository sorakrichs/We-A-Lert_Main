
import React,{useState, useMemo} from 'react'
import {
    View,
    Text,
    Pressable,
    SafeAreaView,
    Button,
    StyleSheet,
    TouchableHighlight,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Alert,
    ScrollView,
    Linking
    } from 'react-native';
import Header from './subComponant/Header'
import Icon from 'react-native-vector-icons/Ionicons';
import {useAlert} from '../providers/AlertProvider'
import Entypo from 'react-native-vector-icons/Entypo'

const phones = {
    'สายด่วนสำหรับแจ้งเหตุด่วนเหตุร้าย': 
    [
        {
            name: 'แจ้งเหตุด่วน-เหตุร้ายทุกชนิด',
            number: '191'
        },
        {
            name: 'แจ้งอัคคีภัย สัตว์เข้าบ้าน',
            number: '199'
        },
        {
            name: 'ศูนย์ความปลอดภัย กรมทางหลวงชนบท',
            number: '1146'
        },
        {
            name: 'อุบัติเหตุทางน้ำ กองบัญชาการตำรวจ',
            number: '1196'
        },
        {
            name: 'กรมป้องกันและบรรเทาสาธารณภัย',
            number: '1784'
        },
    ],
    'สายด่วนสำหรับแจ้งเหตุฉุกเฉิน/กู้ชีพ/กู้ภัย': 
    [
        {
            name: 'ศูนย์ปลอดภัยคมนาคม',
            number: '1356'
        },
        {
            name: 'หน่วยแพทย์กู้ชีวิต วชิรพยาบาล',
            number: '1554'
        },
        {
            name: 'หน่วยแพทย์กู้ชีพกรุงเทพมหานคร',
            number: '1555'
        },
        {
            name: 'ศูนย์เอราวัณ สำนักการแพทย์ กรุงเทพมหานคร',
            number: '1646'
        },
        {
            name: 'สถาบันการแพทย์ฉุกเฉินแห่งชาติ',
            number: '1669'
        },
        {
            name: 'ศูนย์ส่งกลับและรถพยาบาล โรงพยาบาลตำรวจ',
            number: '1691'
        },
        {
            name: 'ศูนย์เตือนภัยพิบัติแห่งชาติ',
            number: '1860'
        }
    ]
}

const onPressMobileNumberClick = (number) => {

    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }

    Linking.openURL(phoneNumber);
 }

const PhoneCall = ({navigation}) => {

    const {willAlert} = useAlert();
    

    
    return (
        <SafeAreaView style={styles.container}>
            <Header
                navigation={navigation}
                title = {'เบอร์ติดต่อหน่วยฃาน'}
                color = {'seagreen'}
            />
            <ScrollView>
            {   Object.entries(phones).map( (value,index) => {
                
                    return(
                        <View key={index} style={{marginBottom:25}}>    
                            <Text style={styles.subTopic}>{value[0]}</Text>
                                {
                                value[1].map((phone,index1) => {
                                    return(
                                    <View key={index1} style={styles.section}>
                                        <Text style={styles.addressText}>{phone.name}</Text>
                                        <TouchableOpacity style={styles.phoneIcon}
                                            onPress={() => onPressMobileNumberClick(phone.number)}>
                                            <Entypo name='phone' size={25}/>
                                        </TouchableOpacity>
                                    </View>
                                    )
                                })}
                        </View> 
                    )

                })
                
            }
            </ScrollView>            
        </SafeAreaView>
      );

}

export default PhoneCall;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    topView:{
        width: '100%', 
        height: 60, 
        flexDirection: 'row',
        backgroundColor : 'seagreen',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30
    },
    title :
    {
      fontSize : 24,
      fontFamily: 'Mitr-Bold',
    },
    iconBack : {
        position:'absolute',
        left:10
    },
    subTopic: {
        marginTop:20,
        fontFamily: 'Mitr-Bold',
        fontSize: 20,
        color:'dimgray',
        alignSelf:'center'
    },
    section: {

        backgroundColor:'red',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        backgroundColor: 'white',
        margin:5,
        padding:15,
        borderRadius:10

    },
    recButton: {
        backgroundColor: "lightblue",
        borderColor: 'dodgerblue',
        borderWidth:5,
        padding: 25,
        elevation: 2,
        alignItems:'center',
        alignSelf:'center',
        margin: 10
    },
    addressText: {
        fontSize: 16,
        color:'dimgray',
        fontFamily: 'Mitr-Regular'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: '80%'
    },
    buttonOpen: {
        backgroundColor: "lightblue",
    },
    reportbtn : {
        backgroundColor : 'springgreen',
        padding : 10 ,
        margin : 10,
        flex:1,
        alignItems:'center',
        borderRadius:10
    },
    reportText:{
        color:'white',
        fontSize:20,
        fontFamily: 'Mitr-Bold'
    },
    phoneIcon:{
        position:'absolute',
        backgroundColor:'lime',
        borderRadius:100,
        borderWidth:2,
        padding:5,
        borderColor:'green',
        top:'25%',
        right:'5%',
        justifyContent:'center'
    }
  });