
import React,{useState, useMemo,useEffect,useCallback} from 'react'
import {
    View,
    Text,
    Image,
    Pressable,
    SafeAreaView,
    Button,
    StyleSheet,
    TouchableHighlight,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Alert,
    ScrollView
    } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import {useAuth} from '../../../providers/AuthProvider'
import {useReport} from '../../../providers/ReportProvider'
import {useMap} from '../../../providers/MapProvider'
import {useAlert} from '../../../providers/AlertProvider'
import cardata from '../../../data/cardata.json'
import DropDownPicker from 'react-native-dropdown-picker';

const ViewReportModal = ({navigation,route}) => {

    const {willAlert} = useAlert();
    const {getLocation,address,setReport,type,setType,subType,setSubType,litigant,setLitigant,updateReportStatus,data,description} = useReport();
    const {session} = useAuth();
    const [license, setLicense] = useState("");
    const [makeOpen, setMakeOpen] = useState(false);
    const [modelOpen, setModelOpen] = useState(false);
    const [yearOpen, setYearOpen] = useState(false);
    const [validateButton,setValidateButton] = useState(false);

    useEffect(()=> {

        let active = true; 
        if(route?.params?.report && active) {
            setReport(route?.params?.report);
        }



        return () => { active = false;};

    },[])

    const updateStatus = async (status:String) => {
        try{
    
            await updateReportStatus(status);
            willAlert('เปลี่ยนแปลงสถานะเสร็จสิ้น');
            navigation.navigate('Map')
        } catch (err) {

            willAlert('เครือข่ายมีปัญหา',(err?.response?.data?.message) ? err?.response?.data?.message : err?.message);

        }
    }

    const Car = () => {

        return(
            <View style={styles.section}>
                <Text style = {styles.subTopic}>ผู้ประสบเหตุ</Text>
                <ScrollView>
                    {data?.litigant?.map((value,index) => 
                            <View key={index} style={styles.inputSection}>
                                <Text style={styles.subSectionText}>{`ผู้ประสบเหตุ ${index+1}`}</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.subSectionText}>ทะเบียน</Text>
                                    <Text style={{color:'dimgray',fontFamily: 'Mitr-Regular'}}>{`:    `+value?.license}</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.subSectionText}>ยี่ห้อ</Text>
                                    <Text style={{color:'dimgray',fontFamily: 'Mitr-Regular'}}>{`:    `+value?.make}</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.subSectionText}>รุ่น</Text>
                                    <Text style={{color:'dimgray',fontFamily: 'Mitr-Regular'}}>{`:    `+value?.model}</Text>
                                </View>
                            </View>
                    )}
                </ScrollView>  
            </View>
        )
    }

    const Patient = () => {

        return(
            <View style={styles.section}>
                <Text style = {styles.subTopic}>ผู้ป่วย</Text>
                <ScrollView>
                    {data?.patient?.map((value,index) => 
                            <View key={index} style={styles.inputSection}>
                                <Text style={styles.subSectionText}>{`ผู้ป่วย ${index+1}`}</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.subSectionText}>ชื่อ-นามสกุล</Text>
                                    <Text style={{color:'dimgray',fontFamily: 'Mitr-Regular'}}>{`:    `+value?.name + " " +value?.surname}</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.subSectionText}>อาการ</Text>
                                    <Text style={{color:'dimgray',fontFamily: 'Mitr-Regular'}}>{`:    `+value?.symptom}</Text>
                                </View>
                            </View>
                    )}
                </ScrollView>  
            </View>
        )
    }



    const Range = () => {

        return(
            <View style={styles.section}>
                <Text style = {styles.subTopic}>รัศมี</Text>
                <Text style={{color:'dimgray',fontFamily: 'Mitr-Regular'}}>{data?.range} เมตร</Text>
            </View>
        )
    }

    const Tsunami = () => {

        return(
            <View style={styles.section}>
                <Text style = {styles.subTopic}>การเตือนภัยสึนามิ</Text>
                <Text style={{color:'dimgray',fontFamily: 'Mitr-Regular',textAlign:'center',color:(data?.tsuami) ? 'red' : 'green'}}>
                    {(data?.tsuami) ? 'มีการเตือนภัย' : 'ไม่มีการเตือนภัย'}
                </Text>
            </View>
        )
    }

    const Depth = () => {

        return(
            <View style={styles.section}>
                <Text style = {styles.subTopic}>ความลึก</Text>
                <Text style={{color:'dimgray',fontFamily: 'Mitr-Regular'}}>{data?.depth} เมตร</Text>
            </View>
        )
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.topView,{backgroundColor : 'crimson'}]} >
                <Icon style={ styles.iconBack } name = {'chevron-back'} size = {28} onPress={() => navigation.goBack()} />
                <View>
                    <Text style = {styles.title}>รายละเอียด</Text>
                </View>
            </View>
            <ScrollView>
                <View style={styles.section}>
                    <Text style={styles.subTopic}>ประเภทอุบัติภัย</Text> 
                    <View style={{flexDirection: 'row', flexWrap: 'wrap',margin:10,alignContent:'center',justifyContent:'center'}}> 
                    { (type == 'car') ?
                        
                            (data?.type == 'broken') ?
                            <View style={[styles.typeButton,{backgroundColor: 'lightgray'}]}>
                                <Image source={require('../../../assets/report/brokencar.png')} style={{width: 80, height: 80}}/>
                                <Text style={styles.selectText}>รถเสีย</Text>
                            </View>: 
                            <View style={[styles.typeButton,{backgroundColor: 'lightsteelblue'}]}>
                                <Image source={require('../../../assets/report/carcrash.png')} style={{width: 80, height: 80}}/>
                                <Text style={styles.selectText}>รถชน</Text>
                            </View>: 
                        (type == 'fire') ?
                            (data?.type == 'A') ?
                                <View style={[styles.typeButton,{alignItems:'center'}]}>
                                    <Image source={require('../../../assets/manual/ClassAFire.png')} style={{width: 80, height: 80}}/>
                                    <Text style={styles.selectText}>ไฟไหม้ประเภทของแข็ง</Text>
                                </View> :
                                (data?.type == 'B') ?
                                <View style={[styles.typeButton,{alignItems:'center'}]}>
                                    <Image source={require('../../../assets/manual/ClassBFire.png')} style={{width: 80, height: 80}}/>
                                    <Text style={styles.selectText}>ไฟไหม้แบบของเหลวที่มีไอระเหยสามารถติดไฟได้</Text>
                                </View> :
                                (data?.type == 'C') ?
                                <View style={[styles.typeButton,{alignItems:'center'}]}>
                                    <Image source={require('../../../assets/manual/ClassCFire.png')} style={{width: 80, height: 80}}/>
                                    <Text style={styles.selectText}>ไฟไหม้ที่เกิดขึ้นกับเครื่องมือและอุปกรณ์ไฟฟ้า</Text>
                                </View> :
                                <View style={[styles.typeButton,{alignItems:'center'}]}>
                                    <Image source={require('../../../assets/manual/ClassDFire.png')} style={{width: 80, height: 80}}/>
                                    <Text style={styles.selectText}>ไฟไหม้แบบจากโลหะติดไฟ</Text>
                                </View> : 
                        (type == 'flood') ?
                        <View style={[styles.typeButton,{backgroundColor: 'royalblue'}]}>
                            <MIcon name="home-flood" size={80} color="white"/>
                            <Text style={styles.selectText}>น้ำท่วม</Text>
                        </View> :
                        (type == 'epidemic') ?
                        <View style={[styles.typeButton,{backgroundColor: 'yellowgreen'}]}>
                            <MIcon name="virus" size={80} color="white"/>
                            <Text style={styles.selectText}>โรคระบาด</Text>
                        </View> :
                        <View style={[styles.typeButton,{backgroundColor: 'lightgray'}]}>
                             <Image source={require('../../../assets/report/earthquake.png')} style={{width: 90, height: 90}}/>
                            <Text style={styles.selectText}>แผ่นดินไหว</Text>
                        </View>
                        }
                    </View>
                </View> 
                {   (type == 'car') ? <Car/> :
                    (type == 'flood') ? <Depth/> :
                    (type == 'epidemic') ? <Patient/> :
                    (type == 'fire') ? <Range/> :
                    (type == 'earthquake') ? <Tsunami/>
                    : null
                }
                <View style={styles.section}>
                    <Text style={styles.subTopic}>สถานที่เกิดเหตุ</Text>   
                    { address?.aoi ? 
                        <Text style={styles.addressText}>{address?.aoi}</Text> : null
                    }
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.addressText}>{address?.subdistrict + '  '}</Text>
                        <Text style={styles.addressText}>{address?.district}</Text>
                    </View>
                    <Text style={styles.addressText}>{address?.province}</Text>
                    <Text style={styles.addressText}>{address?.postcode}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subTopic}>รายละเอียดเพิ่มเติม</Text> 
                    <Text style={{alignSelf:'center',fontSize:16,color:'black',fontFamily: 'Mitr-Regular',padding:20}}>{
                        (description) ? description : 'ไม่ได้ระบุไว้'
                    }</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subTopic}>ดูรูปภาพ</Text> 
                    <TouchableOpacity style={[styles.reportbtn,{backgroundColor:'crimson'}]} onPress={() => navigation.navigate('ImagesCollection')}>
                        <Text style={{fontSize:20,color:'white',fontFamily: 'Mitr-Bold'}}>
                            <Icon name='image' size={30}/>
                             รูปภาพ
                        </Text>
                    </TouchableOpacity>
                    </View>
            </ScrollView>
            { (session?.id && address?.volunteer?._id == session?.id) ?
                <View style={{flexDirection:'row',alignItems:'center',backgroundColor: 'white'}}>
                    <TouchableOpacity style = {styles.reportbtn}
                    onPress={ 
                        async () => { 

                            willAlert('ยืนยันการเสร็จสิ้นของงาน','',async () => await updateStatus,['finished'],'ask')
    
                        }}>
                        <Text style = {styles.reportText}>
                            เสร็จสิ้น
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.reportbtn,{backgroundColor:'red'}]}
                    onPress={ 
                        async () => { 

                            willAlert('ยืนยันการยกเลิกงาน','',async () => await updateStatus,['cancel'],'ask')
    
                        }}>
                        <Text style = {styles.reportText}>
                            ยกเลิก
                        </Text>
                    </TouchableOpacity>
                </View> : null
            }
            
                

        </SafeAreaView>
      );

}

export default ViewReportModal;

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
        left:10,
        fontFamily: 'Mitr-Bold',
        fontSize: 18,
        color: 'dimgray'
    },
    section: {
        backgroundColor:'red',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        backgroundColor: 'white',
        margin:10,
        padding:10,
        borderRadius:10

    },
    typeButton: {
        padding:10,
        paddingLeft:20,
        paddingRight:20,
        margin:10
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
    selectText: {
        alignSelf:'center',
        fontSize: 16,
        color: 'black',
        fontFamily: 'Mitr-Regular'
    },
    inputSection: {
        borderWidth:1,
        borderColor:'black',
        padding:10,
        marginTop:10,
        marginBottom:10,
        borderRadius:10
    },
    subSectionText: {
        color:'dimgray',
        fontFamily: 'Mitr-Bold'
    }
  });