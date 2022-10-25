import React, { useState , useEffect, useMemo,useRef,useCallback, useLayoutEffect} from 'react';
import {
    View,
    Text,
    NativeModules,
    LayoutAnimation,
    Pressable,
    SafeAreaView,
    Button,
    StyleSheet,
    TouchableHighlight,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Alert,
    LogBox,
    requireNativeComponent,
    SectionList,
    AppState,
    Image
    } from 'react-native';
import Modal from "react-native-modal";
import {base64Marker} from '../assets/images'

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import IconEn from 'react-native-vector-icons/Entypo';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconIo from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMa from 'react-native-vector-icons/MaterialIcons';

import {markerToAddress} from '../controllers/mapControllers'
import {sendReport} from '../controllers/reportControllers'
import {locationPermission} from '../controllers/permissionControllers'

import Geolocation from 'react-native-geolocation-service';
import SearchSceen from './map/SearchSceen'
import SplashScreen from 'react-native-splash-screen'
import {useAuth} from '../providers/AuthProvider'
import {useMap} from '../providers/MapProvider'
import {useAlert} from '../providers/AlertProvider'
import {useTracking} from '../providers/TrackingProvider'
import {ReportProvider} from '../providers/ReportProvider'
import Popup from './popup/Popup'
import ExploreSceen from './map/ExploreSceen'
import LoadingScreen from './misc/LoadingScreen'
import AlertListModal from './misc/AlertListModal'
LogBox.ignoreLogs([
 'Non-serializable values were found in the navigation state',
 "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
 'Require cycle:'
]);



const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default MapView = ({navigation, route}) => {

    const [explore, setExplore] = useState(false);
    const [validateVisible, setValidateVisible] = useState(false);
    const [alertListVisible,setAlertListVisible] = useState(false);
    const [popupVisible,setPopupVisible] = useState(false);
    const [menuState,setMenuState] = useState('');
    const [popupId,setPopupId] = useState(0);
    const [pinAddress,setPinAddress] = useState(null); 
    const [loading,setLoading] = useState(false);
    const bottomSheetModalRef = useRef();
    const {session,Login,Logout,checkLogin,loadSetting,sessionRef} = useAuth();
    const {Longdo,map,setHome,loadPin,loadPinFromServer,getPinByType,reloadPin,mapClear,focus,focusLocation,clearPinData,loadPinFromExternalAPI,savePin} = useMap();
    const {willAlert,setupNotification,getInitialNotification,registerNotification,loadNotification} = useAlert();
    const {currentLocation,observing,getLocationUpdates,removeLocationUpdates,getCurrentLocation} = useTracking();
    const mapReady = useRef(false);

    const waitForMap = () => new Promise((resolve, reject) => {

        if(!mapReady.current) {
            setTimeout(() => {resolve(waitForMap())}, 100); /* this checks the flag every 100 milliseconds*/

        } else {
            return resolve('pass');
        }
    });

    useMemo( async () => {

        await registerNotification();  

    }, [])
    

    useMemo( async () => {


        try {

            await waitForMap();
            await clearPinData();
            await checkLogin(); 
            let session_data = sessionRef.current;
            if(session_data.role != 'guest' && session_data.id) {
                let setting = await loadSetting(session_data);
                if(setting?.auto_open_tracking){
                    await getLocationUpdates()
                }
                await Promise.all([
                    loadNotification(session_data.id),
                    loadPin(session_data.id),
                    setupNotification(session_data),
                    loadPinFromExternalAPI(), 
                    setHome(session_data.id),
                    getCurrentLocation(),
                    loadPinFromServer()
                ])
            } else {
                await Promise.all([
                    loadNotification(null),
                    loadPin(null),
                    setupNotification(),
                    loadPinFromExternalAPI(), 
                    getCurrentLocation(),
                    loadPinFromServer()
                ])

            }
            

            await getInitialNotification();




        } catch (err) {

            willAlert('เกิดปัญหาขึ้น',(err?.response?.data?.message) ? err?.response?.data?.message : err?.message)


        } finally {

            SplashScreen.hide();

        }


        

    }, [session])

    
    // callbacks
    const handlePresentModalPress = useCallback( async () => {
        setLoading(true)
        bottomSheetModalRef.current?.present();
    }, []);


    const changeMenu = (state: String) => {
        LayoutAnimation.configureNext(
            LayoutAnimation.create(
              200,
              LayoutAnimation.Types.linear,
              LayoutAnimation.Properties.scaleXY
            )
          );
        setMenuState(state);
    }





    return (
        <SafeAreaView style={styles.container}>
            <TextInput placeholder="ค้นหาสถานที่" style = {styles.input} placeholderTextColor='silver' onFocus={()=> navigation.navigate('Search')}/>
            <Longdo.MapView 
                ref={map}
                onOverlayClick={ async overlay => { 

                    setPopupId(overlay.$id); 
                    setPopupVisible(true);

                }}
                onClick = {() => {changeMenu('')}}
                onReady={() => {mapReady.current = true}} 
            />
            <Popup 
                open={popupVisible} 
                validate = {()=> {setValidateVisible(true); setPopupVisible(false);}} 
                onClose={()=> setPopupVisible(false)} 
                id={popupId}
                navigation={navigation}
            />
            <AlertListModal
                open={alertListVisible} 
                onClose={()=> setAlertListVisible(false)} 
            />
            
            <ExploreSceen 
                ref={bottomSheetModalRef}
                index={1}
                enablePanDownToClose={true}
                snapPoints={['20%', '40%','60%','80%','100%']}
                location={currentLocation} 
                setLoading = {setLoading}
            />
            <TouchableOpacity style={{position:'absolute',backgroundColor:'white',borderRadius: 100,right:'5%', top:'17%',elevation: 3,borderWidth:1,borderColor:'slategray'}}
                onPress = {()=> navigation.navigate('Manual')} 
            
            >
                <IconIo color ='dimgray' name="information" size={42}/>
            </TouchableOpacity>
            <TouchableOpacity style={{position:'absolute',backgroundColor:'lime',padding: 5,borderRadius: 100,right:'5%', top:'27%',elevation: 3,borderWidth:1,borderColor:'green'}}
                onPress = {()=> navigation.navigate('Phone')} 
            >
                <Icon color ='white' name="volume-control-phone" size={38}/>
            </TouchableOpacity>
            <TouchableOpacity style={{position:'absolute',backgroundColor:'white',padding: 7,borderRadius: 100,right:'20%', top:'17%',elevation: 3,borderWidth:1,borderColor:'slategray'}}
                onPress = {()=> setAlertListVisible(true)} 
            
            >
                <Icon color ='goldenrod' name="bell" size={30}/>
            </TouchableOpacity>
            <TouchableOpacity style={{position:'absolute',padding:4,backgroundColor:'dodgerblue',borderRadius: 100,right:'5%', bottom:'15%',elevation: 3,borderWidth:1,borderColor:'blue'}}
                onPress = {()=> focusLocation(currentLocation)} 
            >
                <IconMa color ='white' name="my-location" size={38}/>
            </TouchableOpacity>
            {menuState === 'type' ?
            <View style={styles.usermenubar}>
                <TouchableOpacity style={{width:90,height:90,bottom:35,alignSelf:'flex-start',alignItems:'center',backgroundColor: "powderblue",
                    justifyContent:'center',borderRadius: 100,borderWidth:10,borderColor:'white'}}
                    onPress={() => {changeMenu('');}}
                >
                    <Icon name="list" size={48}/>
                </TouchableOpacity>
                <View style={{flexDirection:'row',bottom:35}}>
                    <Pressable style={{width:75,height:75,alignItems:'center',flex:1/3}} onPress={async () =>  {await getPinByType('car'); changeMenu('');}}>
                        <Icon name="car" size={45} color={'black'}/>
                        <Text style={styles.iconBoldText}>รถชน</Text>
                    </Pressable>
                    <Pressable style={{width:75,height:75,alignItems:'center',flex:1/3}} onPress={async() => {await getPinByType('fire'); changeMenu('');}}>
                        <Icon name="fire" size={45} color={'red'}/>
                        <Text style={styles.iconBoldText}>ไฟไหม้</Text>
                    </Pressable>
                    <Pressable style={{width:75,height:75,alignItems:'center',flex:1/3}} onPress={async() => {await getPinByType('epidemic'); changeMenu('');}}>
                        <IconM name="virus" size={45} color={'green'}/>
                        <Text style={styles.iconBoldText}>โรคระบาด</Text>
                    </Pressable>
                </View>
                <View style={{flexDirection:'row',bottom:35}}>
                    <Pressable style={{width:75,height:75,alignItems:'center',flex:1/3}} onPress={async() => {await getPinByType('flood'); changeMenu('');}}>
                        <IconM name="home-flood" size={45} color={'blue'}/>
                        <Text style={styles.iconBoldText}>น้ำท่วม</Text>
                    </Pressable>
                    <Pressable style={{width:75,height:75,alignItems:'center',flex:1/3}} onPress={async() => {await getPinByType('earthquake'); changeMenu('');}}>
                        <Image source={require('../assets/report/earthquake.png')} style={{width: 50, height: 50}}/>
                        <Text style={styles.iconBoldText}>แผ่นดินไหว</Text>
                    </Pressable>
                    <Pressable style={{width:75,height:75,alignItems:'center',flex:1/3}} onPress={async() => {await reloadPin(); changeMenu('');}}>
                    <Icon5 name="map-marked-alt" size={45} color={'black'}/>
                        <Text style={styles.iconBoldText}>ทั้งหมด</Text>
                    </Pressable>
                </View>
            </View> : menuState === 'user' ?
            <View style={styles.usermenubar}>
                <TouchableOpacity style={{width:90,height:90,bottom:35,alignSelf:'flex-end',alignItems:'center',backgroundColor: "powderblue",
                    justifyContent:'center',borderRadius: 100,borderWidth:10,borderColor:'white'}}
                    onPress={() => {changeMenu('');}}
                >
                    <Icon color ='dimgray' name="user" size={48}/>
                </TouchableOpacity>
                <View style={{flexDirection:'row',bottom:35}}>
                    <Pressable style={{width:75,height:75,alignItems:'center',flex:1/3}} onPress={() => navigation.navigate('Profile')}>
                        <Icon color ='dimgray' name="user" size={45}/>
                        <Text style={styles.iconBoldText}>บัญชี</Text>
                    </Pressable>
                    <Pressable style={{width:75,height:75,alignItems:'center',flex:1/3}} onPress={() => navigation.navigate('Setting')}>
                        <IconAnt color ='dimgray' name="setting" size={45}/>
                        <Text style={styles.iconBoldText}>ตั้งค่า</Text>
                    </Pressable>
                    <Pressable style={{width:75,height:75,alignItems:'center',flex:1/3}} onPress={() => {(observing) ? 
                        removeLocationUpdates() : 
                        willAlert('เปิดระบบติดตาม','แอปพลิเคชั่นใช้ gps ของคุณในการระบุตำแหน่งและแจ้งเตือนอุบัติภัยที่อยู่ในระยะได้',async () => await getLocationUpdates,null,'ask')}}>
                        <IconEn color ='dimgray' name="pin" size={45}/>
                        <Text style={styles.iconBoldText}>{(observing) ? 'ยกเลิกติดตาม': 'ติดตาม'}</Text>
                    </Pressable>
                </View>
                <View style={{flexDirection:'row',bottom:35}}>
                    {session.role === 'volunteer' && 
                        <Pressable style={{width:75,height:75,alignItems:'center',flex:1/3}} 
                        onPress={() => {navigation.navigate('OrganizeProfile')}}>
                            <Icon5 color ='dimgray'name="building" size={45}/>
                            <Text style={styles.iconBoldText}>องค์กร</Text>
                        </Pressable>
                    }
                    <Pressable style={{width:75,height:75,alignItems:'center',flex:1/3}} 
                    onPress={async () => {

                        try {
                            savePin();
                            await Promise.all([
                                Logout(session.id,session.role),
                                removeLocationUpdates()
                                ]
                            )
                            changeMenu('');
                        } catch (err) {
                            willAlert('เกิดปัญหาขึ้น',(err?.response?.data?.message) ? err?.response?.data?.message : err?.message)
                        } 
                        
                    }}>
                        <IconEn color ='dimgray' name="log-out" size={45}/>
                        <Text style={styles.iconBoldText}>ออกจากระบบ</Text>
                    </Pressable>
                </View>
            </View> : 
            <View style={styles.menubar}>
                <TouchableOpacity style={styles.icon} onPress={() => changeMenu('type')}>
                    <Icon color ='dimgray' name="list" size={30}/>
                    <Text style={styles.iconText}>ประเภท</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Statistic')}>
                    <Icon color ='dimgray' name="pie-chart" size={30}/>
                    <Text style={styles.iconText}>สถิติ</Text>
                </TouchableOpacity>
                <View style={{flex:125/100}}/>
                <TouchableOpacity style={styles.icon} onPress={handlePresentModalPress}>
                    <Icon color ='dimgray' name="search" size={30}/>
                    <Text style={styles.iconText}>สำรวจ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon} onPress={() => { (session?.role === 'member' || session?.role === 'volunteer') ? 
                changeMenu('user') : navigation.navigate('Login')}}>
                    <Icon color ='dimgray' name="user" size={30}/>
                    <Text style={[styles.iconText,{fontSize : 12}]}>{(session.username) ? session.username : 'เข้าสู่ระบบ'}</Text>
                </TouchableOpacity> 
            </View>}
            {menuState === '' ?
            <TouchableHighlight onPress={()=> { (session.username) ? navigation.navigate('Report') : willAlert('แจ้งเตือน','ต้องเข้าสู่ระบบก่อนถึงจะรายงานได้')}} 
                style={styles.addMarkerButton} underlayColor="#973A6E">
                    <Icon color ='maroon' name="map-marker" size={48}/>
            </TouchableHighlight> : null }
            
            {loading && <LoadingScreen animating={loading}/>}
            
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    menubar: {
        flex:1/8,
        flexDirection:'row',
        borderRadius: 25,
        backgroundColor: "white"
    },
    usermenubar: {
        flex:2/3,
        backgroundColor: "lightcyan",
        borderTopWidth: 10,
        borderTopColor:'white'
    },
    icon:{
        flex:1,
        justifyContent:'center',
        alignItems: "center",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    addMarkerButton: {
        position: 'absolute',
        borderWidth:10,
        borderColor:'white',
        width: 90,
        height: 90,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 100,
        top: '85%', 
        backgroundColor: '#ED89C1',
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
    },
    input: {

        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#fff',
        fontFamily: 'Mitr-Regular',
        zIndex: 10,
    },
    iconText: {
        color: 'dimgray',
        fontFamily: 'Mitr-Regular'
    },
    iconBoldText: {
        color: 'dimgray',
        fontFamily: 'Mitr-Bold'
    }
});

