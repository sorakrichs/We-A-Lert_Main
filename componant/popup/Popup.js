
import React,{useState,useMemo,useCallback} from 'react'
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
    ScrollView,
    Image,
    Linking,
    Platform,
    Alert
    } from 'react-native';
import Modal from "react-native-modal";
import {useMap} from '../../providers/MapProvider'
import {date,reportStatus} from '../../controllers/miscControllers'
import {banUser} from '../../controllers/userControllers'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import ImageCollection from './page/popupImageCollection';
import {useAlert} from '../../providers/AlertProvider'
const HomePopup = ({open,onClose,id,navigation}) => {

    const {getReportData,setFocus,tracking,trackingVolunteer,removePin,isFocus,clearFocus} = useMap();
    const [page,setPage] = useState('');
    const {willAlert} = useAlert();

    const report = useMemo(() => {
        return getReportData(id);
    }, [id]);
    const onPressMobileNumberClick = (number) => {

        let phoneNumber = '';
        if (Platform.OS === 'android') {
          phoneNumber = `tel:${number}`;
        } else {
          phoneNumber = `telprompt:${number}`;
        }
  
        Linking.openURL(phoneNumber);
     }


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

    return <TouchableOpacity style = {[styles.validatebtn, {flexDirection:'row',backgroundColor : 'springgreen',alignItems:'center',justifyContent:'center'}]}
        onPress={handlePress}>
        <Text>{children}</Text>
    </TouchableOpacity>;
    };

    const HomeModal = () => {
        return(
            <View style= {[styles.modalView,{paddingVertical:30}]}>
                <View style = {{flexDirection:'row', borderBottomColor: 'black',borderBottomWidth: 1 , marginBottom:10,paddingHorizontal:50}}>
                    <Ionicons color='dimgray' name='home' size={20}/>
                    <Text style={styles.topicText}> บ้าน </Text>
                </View>
                <View style = {styles?.section}>
                    <View style = {{flexDirection:'row'}}>
                        <Text style={styles.textStyle}>{report?.address.subdistrict} </Text>
                        <Text style={styles.textStyle}>{report?.address.district} </Text>
                    </View>
                    <View style = {{flexDirection:'row'}}>
                        <Text style={styles.textStyle}>{report?.address.province}</Text>
                    </View>
                    <View style = {{flexDirection:'row'}}>
                        <Text style={styles.textStyle}>{report?.address.postcode}</Text>
                    </View>
                </View>
            </View>
        )
    }

    const SearchModal = () => {

        return(
            <View style= {styles.modalView}>
                <View style = {styles?.section}>
                    <View style = {{flexDirection:'row', borderBottomColor: 'black',borderBottomWidth: 1,marginTop:10}}>
                        <Entypo color='dimgray' name='location-pin' size={20}/>
                        <Text style={styles.topicText}> หมุดสถานที่ </Text>
                    </View>
                </View>
                <View style = {styles?.section}>
                    <Text style={styles.sectionText}> ชื่อสถานที่ </Text>
                    <Text style={styles.textStyle}>{report?.name}  </Text>
                </View>
                <View style = {styles?.section}>
                    <Text style={styles.sectionText}> ที่อยู่ </Text>
                    <Text style={styles.textStyle}>{report?.address}  </Text>
                </View>
                <View style = {[styles?.section,{borderTopWidth:1}]}>
                    <View style={{flexDirection:'row',alignItems:'center',backgroundColor: 'white'}}>
                        { !isFocus ?
                        <TouchableOpacity style={[styles.validatebtn, {flexDirection:'row',backgroundColor: 'aquamarine',alignItems:'center',justifyContent:'center'}]} 
                            onPress={() => { onClose(); setFocus(id);}} >
                            <Entypo name='location-pin' size={25}/>
                            <Text style={{fontFamily: 'Mitr-Bold'}} >ติดตาม</Text>
                        </TouchableOpacity> :
                        <TouchableOpacity style={[styles.validatebtn, {flexDirection:'row',backgroundColor: 'orange',alignItems:'center',justifyContent:'center'}]} 
                            onPress={() => { onClose(); clearFocus();}} >
                            <Entypo name='location-pin' size={25}/>
                            <Text style={{fontFamily: 'Mitr-Bold'}} >เลิกติดตาม</Text>
                        </TouchableOpacity>
                        }
                        <TouchableOpacity style={[styles.validatebtn, {flexDirection:'row',backgroundColor : 'red',alignItems:'center',justifyContent:'center'}]} 
                            onPress={() => { onClose(); removePin(id);}} >
                            <Entypo name='location-pin' size={25}/>
                            <Text style={{fontFamily: 'Mitr-Bold'}} >เอาหมุดออก</Text>
                        </TouchableOpacity>
                    </View>      
                </View>
            </View>
        )
    }


    const ValidateModal = () => {

        return(
            <View style= {styles.validateReportModal}>
                <View style = {styles?.section}>
                { (report?.type == 'car') ? 
                    <View style = {{flexDirection:'row', borderBottomColor: 'black',borderBottomWidth: 1,marginTop:10}}>
                        <Entypo name='location-pin' size={20} color='black'/>
                        <Text style={styles.topicText}>อุบัติเหตุทางจราจร </Text> 
                    </View> :
                    (report?.type == 'fire') ? 
                    <View style = {{flexDirection:'row', borderBottomColor: 'black',borderBottomWidth: 1,marginTop:10}}>
                        <Entypo name='location-pin' size={20} color='red'/>
                        <Text style={styles.topicText}>ไฟไหม้ </Text> 
                    </View> :
                    (report?.type == 'epidemic') ? 
                    <View style = {{flexDirection:'row', borderBottomColor: 'black',borderBottomWidth: 1,marginTop:10}}>
                        <Entypo name='location-pin' size={20} color='green'/>
                        <Text style={styles.topicText}>โรคระบาด </Text> 
                    </View> :
                    (report?.type == 'earthquake') ? 
                    <View style = {{flexDirection:'row', borderBottomColor: 'black',borderBottomWidth: 1,marginTop:10}}>
                        <Entypo name='location-pin' size={20} color='brown'/>
                        <Text style={styles.topicText}>แผ่นดินไหว </Text> 
                    </View> :
                    <View style = {{flexDirection:'row', borderBottomColor: 'black',borderBottomWidth: 1,marginTop:10}}>
                        <Entypo name='location-pin' size={20} color='blue'/>
                        <Text style={styles.topicText}>น้ำท่วม</Text> 
                    </View>
                }
                </View> 
                    <View style = {styles?.section}>
                        <Text style={styles.sectionText}> รายละเอียด </Text>
                        <Text style={styles.textStyle}>{(report?.description) ? report?.description: 'ไม่ได้ระบุไว้'}</Text>
                    </View>
                    <View style = {styles?.section}>
                        <Text style={styles.sectionText}> ผู้แจ้ง </Text>
                        <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                            <Image style={styles.avatar} source={ (report?.memberImage) ? {uri: report?.memberImage} : require('../../assets/profile/default_user.png')}/>
                            <Text style={styles.textStyle}>{(report?.user?.username)? report?.user?.username: 'ไม่ได้ระบุไว้'}</Text>
                        </View>
                    </View>
                    <View style = {styles?.section}>
                        <Text style={styles.sectionText}> ผู้รับเรื่อง </Text>
                        <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                            <Image style={styles.avatar} source={ (report?.volunteerImage) ? {uri:report?.volunteerImage} : require('../../assets/profile/default_user.png')}/>
                            <Text style={styles.textStyle}> {(report?.volunteer?.username) ? report?.volunteer?.username : 'ไม่มี'} </Text>
                        </View>
                    </View>
                    <View style = {styles?.section}>
                        <Text style={styles.sectionText}> สถานะ </Text>
                        <Text style={{
                            color: (report?.status == 'inprocess') ? 'darkgoldenrod' : (report?.status == 'finish') ? 'green' : 'red'

                        }}>{reportStatus(report?.status)}</Text>
                    </View>
                <View style = {styles?.section}>
                    <View style={{flexDirection:'row',alignItems:'center',backgroundColor: 'white',borderTopWidth:1}}>
                        <TouchableOpacity style={[styles.validatebtn,{backgroundColor: 'dodgerblue'}]} onPress={() => { onClose(); navigation.navigate('ViewReport',{report})}}>
                            <Text style={{fontFamily: 'Mitr-Bold',fontSize:18,color:'white'}} >รายละเอียดเพิ่มเติม</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    const ExternalAPIModal = () => {
        return (
            <View style= {styles.modalView}>
                <View style = {styles?.section}>
                    <View style = {{flexDirection:'row', borderBottomColor: 'black',borderBottomWidth: 1,marginTop:10,textAlign:'center'}}>
                        <Entypo color='brown' name='location-pin' size={20}/>
                        <Text style={styles.topicText}>{`หมุดแผ่นดินไหว`}</Text>
                    </View>
                </View>
                <View style = {styles?.section}>
                    <Text style={styles.sectionText}>{`จาก ${report?.from}`} </Text>
                </View>
                <View style = {styles?.section}>
                    <Text style={styles.sectionText}>สภานที่เกิด</Text>
                    <Text style={styles.textStyle}>{report?.place}</Text>
                </View>
                <View style = {styles?.section}>
                    <Text style={styles.sectionText}> ขนาด (Magnitude)</Text>
                    <Text style={styles.textStyle}>{report?.mag}</Text>
                </View>
                <View style = {styles?.section}>
                    <Text style={styles.sectionText}>ประเภท</Text>
                    <Text style={styles.textStyle}>{report?.magType}</Text>
                </View>
                <View style = {styles?.section}>
                    <Text style={styles.sectionText}> วันที่แจ้ง </Text>
                    <Text style={styles.textStyle}>{date.getDay(report?.time)}</Text>
                    <Text style={styles.textStyle}>{date.getTime(report?.time)}</Text>
                </View>
                <View style = {styles?.section}>
                    <Text style={styles.sectionText}> อัปเดตวันที่ </Text>
                    <Text style={styles.textStyle}>{date.getDay(report?.updated)}</Text>
                    <Text style={styles.textStyle}>{date.getTime(report?.updated)}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',backgroundColor: 'white'}}>
                    <OpenURLButton url={report?.url}><Text style={{fontSize:18,fontFamily: 'Mitr-Regular'}}>ดูข้อมูลเพิ่มเติม</Text></OpenURLButton>
                </View>    
            </View>
        )
    }

    const MyReportPin = () => {

        return (
        page == 'image' ? 
        <ImageCollection images={report?.images} onClose={()=>setPage('')}/> :
        <View style= {styles.modalView}>
            <View style = {styles?.section}>
                <View style = {{flexDirection:'row', borderBottomColor: 'black',borderBottomWidth: 1 , marginBottom:10}}>
                    <Entypo color='dimgray' name='location-pin' size={25}/>
                    <Text style={styles.topicText}> หมุดของฉัน </Text>
                </View>
            </View>
            <View style = {styles?.section}>
                <Text style={styles.sectionText}> สถานที่เกิดเหตุ </Text>
                <View style = {{flexDirection:'row'}}>
                    <Text style={styles.textStyle}>{report?.address.subdistrict}  </Text>
                    <Text style={styles.textStyle}>{report?.address.district}</Text>
                </View>
                <View style = {{flexDirection:'row'}}>
                    <Text style={styles.textStyle}>{report?.address.province}  </Text>
                    <Text style={styles.textStyle}>{report?.address.postcode}</Text>
                </View>
            </View>
            <View style = {{alignItems:'center',margin:10}}>
                <Text style={styles.sectionText}> รายละเอียด </Text>
                <Text style={styles.textStyle}>{(report?.description) ? report?.description: 'ไม่ได้ระบุไว้'}</Text>
            </View>

            <View style = {styles?.section}>
                <Text style={styles.sectionText}> วันหมดอายุ </Text>
                <Text style={styles.textStyle}>{date.getDay(report?.date)}</Text>
                <Text style={styles.textStyle}>{date.getTime(report?.date)}</Text>
            </View>
            {report?.volunteer && <View style = {styles?.section}>
                <Text style={styles.sectionText}> ผู้รับเรื่อง </Text>
                <Text style={styles.textStyle}>{report?.volunteer?.name}</Text>
                <View style={{flexDirection:'row',alignItems:'center',backgroundColor: 'white'}}>
                <TouchableOpacity style={{backgroundColor:'lime',borderRadius:100,borderWidth:2,padding:5,borderColor:'green',margin:5}}
                    onPress={() => onPressMobileNumberClick(report?.volunteer?.phone)}>
                    <Entypo name='phone' size={30}/>
                </TouchableOpacity>
                <TouchableOpacity 
                style={{backgroundColor:(tracking) ? 'purple':'magenta' ,borderRadius:100,borderWidth:2,padding:5,margin:5,borderColor:(tracking) ? 'magenta':'purple'}}
                    onPress={async () =>{
                        try {
                            await trackingVolunteer(report?.volunteer,id); onClose();
                        } catch (err) {
                            willAlert('เกิดข้อผิดพลาดขึ้น',(err?.response?.data?.message) ? err?.response?.data?.message : err?.message)
                        }
                    }}>
                    <Entypo name='pin' size={30}/>
                </TouchableOpacity>
                </View>
            </View>}
            <View style={{flexDirection:'row',alignItems:'center',backgroundColor: 'white'}}>
                <TouchableOpacity style={[styles.validatebtn, styles.buttonOpen, {flexDirection:'row',alignItems:'center',justifyContent:'center'}]} 
                    onPress={()=> { setPage('image')} } >
                        <Entypo name='image' size={25} style={{paddingRight:5}}/>
                        <Text style={{fontFamily: 'Mitr-Bold'}} >รูปภาพ</Text>
                </TouchableOpacity>
            </View>
        </View>)
    }

    const fakeReport = async (userid) => {
        await banUser(userid)
        removePin(id);
        willAlert('แจ้งการรายงานเป็นเท็จเสร็จสิ้น')
        onClose();
    }



    return (
        <View>
        { report?.type && report?.type != 'you' && report?.type != 'volunteer' &&
        <Modal style={styles.centeredView} isVisible={open} onBackButtonPress={onClose} onBackdropPress={onClose} backdropOpacity={0}>
            {report?.type == 'home'? <HomeModal/> : 
            report?.type == 'mypin' ? <MyReportPin/>:
            report?.type == 'report' ?
                (page == 'image' ? 
                <ImageCollection images={report?.images} onClose={()=>setPage('')}/> :
                <View style= {styles.modalView}>
                    <View style = {styles?.section}>
                        <View style = {{flexDirection:'row', borderBottomColor: 'black',borderBottomWidth: 1,marginTop:10}}>
                            <Entypo color='dimgray' name='location-pin' size={20}/>
                            <Text style={styles.topicText}> หมุดที่ยังไม่ได้ตรวจสอบ </Text>
                        </View>
                    </View> 
                    <View style = {styles?.section}>
                        <Text style={styles.sectionText}> ผู้แจ้ง </Text>
                        <Text style={styles.textStyle}>Username: {(report?.reportUser?.username)? report?.reportUser?.username: 'ไม่ได้ระบุไว้'}</Text>
                        <Text style={styles.textStyle}>หมายเลขโทรศัพท์: {(report?.reportUser?.phone)? report?.reportUser?.phone: 'ไม่ได้ระบุไว้'}</Text>
                        <TouchableOpacity style={{backgroundColor:'lime',borderRadius:100,borderWidth:2,padding:5,borderColor:'green'}}
                            onPress={() => onPressMobileNumberClick(report?.reportUser?.phone)}>
                            <Entypo name='phone' size={30}/>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles?.section}>
                        <Text style={styles.sectionText}> สถานที่เกิดเหตุ </Text>
                        <View style = {{flexDirection:'row'}}>
                            <Text style={styles.textStyle}>{report?.address.subdistrict}  </Text>
                            <Text style={styles.textStyle}>{report?.address.district}</Text>
                        </View>
                        <View style = {{flexDirection:'row'}}>
                            <Text style={styles.textStyle}>{report?.address.province}  </Text>
                            <Text style={styles.textStyle}>{report?.address.postcode}</Text>
                        </View>
                    </View>
                    <View style = {styles?.section}>
                        <Text style={styles.sectionText}> รายละเอียดเพิ่มเติม </Text>
                        <Text style={styles.textStyle}>{(report?.description) ? report?.description: 'ไม่ได้ระบุไว้'}</Text>
                    </View>
                    <View style = {[styles?.section,{borderTopWidth:1}]}>
                        <View style={{flexDirection:'row',alignItems:'center',backgroundColor: 'white'}}>
                            <TouchableOpacity style={[styles.validatebtn, styles.buttonOpen, {flexDirection:'row',alignItems:'center',justifyContent:'center'}]} 
                            onPress={()=> { setPage('image')} } >
                                <Entypo name='image' size={25} style={{paddingRight:5}}/>
                                <Text style={{fontFamily: 'Mitr-Bold'}} >รูปภาพ</Text>
                            </TouchableOpacity>

                            { !isFocus ?
                                <TouchableOpacity style={[styles.validatebtn, {flexDirection:'row',backgroundColor: 'aquamarine',alignItems:'center',justifyContent:'center'}]} 
                                    onPress={() => { onClose(); setFocus(id);}} >
                                    <Entypo name='location-pin' size={25}/>
                                    <Text style={{fontFamily: 'Mitr-Bold'}} >ติดตาม</Text>
                                </TouchableOpacity> :
                                <TouchableOpacity style={[styles.validatebtn, {flexDirection:'row',backgroundColor: 'orange',alignItems:'center',justifyContent:'center'}]} 
                                    onPress={() => { onClose(); clearFocus();}} >
                                    <Entypo name='location-pin' size={25}/>
                                    <Text style={{fontFamily: 'Mitr-Bold'}} >เลิกติดตาม</Text>
                                </TouchableOpacity>
                            }
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',backgroundColor: 'white'}}>
                            <TouchableOpacity style={[styles.validatebtn, {flexDirection:'row',backgroundColor : 'springgreen',alignItems:'center',justifyContent:'center'}]}  
                            onPress={() => { onClose(); navigation.navigate('ValidateReport',{report})}}>
                                <Entypo name='check' size={25}/>
                                <Text style={{fontFamily: 'Mitr-Bold'}} >ยืนยันความถูกต้อง</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',backgroundColor: 'white'}}>
                            <TouchableOpacity style={[styles.validatebtn, {flexDirection:'row',backgroundColor : 'red',alignItems:'center',justifyContent:'center'}]}  
                            onPress={async () => { 
                                try {
                                    willAlert('ต้องการยืนยัน','ยืนยันที่จะแจ้งว่าการแจ้งเตือนนี้เป็นเท็จหรือไม่',async () => await fakeReport,[report?.reportUser?.id],'ask')
                                } catch (err) {
                                    willAlert('เกิดข้อผิดพลาดขึ้น',(err?.response?.data?.message) ? err?.response?.data?.message : err?.message)
                                }
                            }}>
                                <Entypo name='cross' size={25}/>
                                <Text style={{fontFamily: 'Mitr-Bold'}} >ข้อมูลไม่เป็นจริง</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>) : 
            report?.type == 'searchPin' ? <SearchModal/> :
            report?.from ? <ExternalAPIModal/>:
            (page == 'image' ? <ImageCollection images={report?.images} onClose={()=>setPage('')}/> : <ValidateModal/>)}
        </Modal> }
        </View>);

}

export default HomePopup;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: "center",
    }, 
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "lightblue",
    },
    buttonClose: {
        backgroundColor: "pink",
    },
    textStyle: {
        color: "black",
        fontFamily: 'Mitr-Regular'
    },
    modalText: {
        fontFamily: 'Mitr-Bold',
        marginBottom: 15,
        fontSize: 20,
        textAlign: "center"
    },
    validateReportModal: {
        backgroundColor: "white",
        borderRadius: 20,
        paddingLeft:20,
        paddingRight:20,
        alignItems: "center",
    },
    section: {
        margin: 10,
        alignItems: 'center'
    },
    validatebtn : {
        padding : 10 ,
        flex: 0.75,
        margin : 10,
        alignItems:'center',
        borderRadius:10,
        backgroundColor : 'springgreen'
    },
    avatar: {
        paddingTop: 20,
        height: 30,
        width: 30,
        borderRadius: 100,
        padding: 20,
    },
    sectionText: {
        fontFamily: 'Mitr-Bold', 
        fontSize:16,
        color:'dimgray',
    },
    topicText: {
        fontFamily: 'Mitr-Bold', 
        fontSize:20,
        bottom:1,
        color:'dimgray'
    }
});