
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
    Switch
    } from 'react-native';
import Header from './subComponant/Header'
import Icon from 'react-native-vector-icons/Ionicons';
import {useAuth} from '../providers/AuthProvider'
import {useAlert} from '../providers/AlertProvider'
import Entypo from 'react-native-vector-icons/Entypo'


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
    const {setting,setSetting} = useAuth();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    

    
    return (
        <SafeAreaView style={styles.container}>
            <Header
                navigation={navigation}
                title = {'แอปพลิเคชัน'}
                color = {'seagreen'}
            />
            <ScrollView>
            <View style={{marginBottom:25}}>    
                <Text style={styles.subTopic}>การติดตาม</Text>
                <View style={styles.section}>
                    <Text style={styles.addressText}>เปิดการติดตามอัตโนมัติเมื่อเปิดแอปพลิเคชัน</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={setting.auto_open_tracking ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(value) => {
                            setSetting({...setting,auto_open_tracking: value})
                        }}
                        value={setting.auto_open_tracking}
                        style={{marginLeft: 'auto'}}
                    />
                </View>
                
            </View>
            <View style={{marginBottom:25}}>    
                <Text style={styles.subTopic}>การแจ้งเตือน</Text>
                <View style={styles.section}>
                    <Text style={styles.addressText}>แจ้งเตือนเมื่อไม่ได้เปิดแอปพลิเคชัน</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={setting.background_alert ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(value) => {
                            if(setting.background_alert)
                                willAlert('คำเตือน','เมื่อปิดส่วนนี้แล้วจะไม่ได้รับการแจ้งเตือนภัยเมื่อปิดแอปพลิเคชัน ต้องการจะเปิดในส่วนนี้หรือไม่',() => setSetting,[{...setting,background_alert: value}],'ask')
                            else
                                setSetting({...setting,background_alert: value})
                            
                        }}
                        value={setting.background_alert}
                        style={{marginLeft: 'auto'}}
                    />
                </View>
            </View>
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
        borderRadius:10,
        flexDirection: 'row'

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