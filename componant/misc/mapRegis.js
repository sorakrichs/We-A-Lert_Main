import React,{useState,useRef,useEffect,useCallback} from 'react';
import {Text,View,StyleSheet,Pressable,TouchableHighlight,Dimensions,Alert,SafeAreaView, TextInput,KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Longdo from 'longdo-map-react-native'
import {markerToAddress} from '../../controllers/mapControllers'
import Modal from 'react-native-modal'
import { useAlert } from '../../providers/AlertProvider';
let keyAPI = '0ba75287512b12f50f558308fb6c720c';



export default mapRegis = ({route,navigation}) => {

    Longdo.apiKey = keyAPI;
    const [modalVisible, setModalVisible] = useState(false);
    const [nameModalVisable, setNameModalVisable] = useState(false);
    const [id,setId] = useState('')
    const [name, setName] = useState('บ้าน');
    const map = useRef(null);
    const mapRef = useCallback((node) => {

            mapRef.current = node;
        

    }, [])


    const [address, setAddress] = useState('');

    useEffect(()=>{

        let process = true;
        setTimeout(() => {
            if(process && route.params.item){
                let {address} = route.params.item;
                setAddress( prev => {
                    return {...prev,subdistrict: address.subdistrict, district: address.district,province: 
                        address.province, postcode: address.postcode, location: address.location
                    }
                })
                setName(route.params.item.name);
                setId(route.params.item.id);
                let newMarker = Longdo.object('Marker', address.location, { detail: 'Marker'});
                mapRef.current.call('Overlays.add', newMarker);
                mapRef.current.call('location', address.location);
                setModalVisible(prev => !prev);

            }
        }, 100);

        return () => {process = false}
    },[mapRef]);

    

    const AddressModal = () => {

            return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {setModalVisible(prev => !prev);}}>
                <KeyboardAvoidingView style={styles.endView}>
                    <View style={styles.modalView}>
                    {address?.aoi && <Text style={styles.addressText}>{address?.aoi}</Text>}
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.addressText}>{address.subdistrict + ' '}</Text>
                            <Text style={styles.addressText}>{address.district}</Text>
                        </View>
                        <Text style={styles.addressText}>{address.province}</Text>
                        <Text style={styles.addressText}>{address.postcode}</Text>

                        <View style={{flexDirection:'row',marginTop:30}}>
                            <Pressable
                                style={[styles.button,{marginRight:20,backgroundColor: 'lightblue'}]}
    
                                onPress={() => { 
                                    setModalVisible(prev => !prev); 
                                    if(route.params.noName) 
                                    {
                                        route.params.addItem(name,address,id); 
                                        navigation.goBack();
                                    }
                                    else {
                                        setNameModalVisable(prev => !prev);}}
                                    }
                            >
                                <Text style={styles.textStyle}>ตกลง</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button,{backgroundColor: 'indianred'}]}
                                onPress={() => {setModalVisible(prev => !prev); mapRef.current.call('Overlays.clear');}}
                            >
                                <Text style={styles.textStyle}>ยกเลิก</Text>
                            </Pressable>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>

            )


    }

    const addMarker = async () => {


        try {

            let location = await mapRef.current.call('location');
            let newMarker = Longdo.object('Marker', location, { detail: 'Marker'});
            let add = await markerToAddress(location);

            if(add.country != 'Thailand' && add.country != 'ประเทศไทย')
                throw new Error (`สามารถรายงานได้แค่ในประเทศไทยเท่านั้น`)

            setAddress( prev => {
                    return {...prev,aoi: add.aoi, subdistrict: add.subdistrict, district: add.district,province: add.province,postcode: add.postcode,location: location}
                }    
            )
            mapRef.current.call('Overlays.add', newMarker);

        } catch (err) {
            willAlert('เกิดข้อผิดพลาดขึ้น',err?.message);
        } finally {
            setModalVisible(prev => !prev);
        }

    }
    
    return(

        <SafeAreaView style={styles.container}>
            <Longdo.MapView 
            ref={mapRef}
            />
            <AddressModal/>
            <Modal
                animationType="fade"
                transparent={true}
                visible={nameModalVisable}
                onRequestClose={() => {setNameModalVisable(!nameModalVisable);}}>
                <KeyboardAvoidingView style={styles.endView}>
                    <View style={styles.modalView}>
                        <Text style={{color:'black',fontSize:20,fontFamily: 'Mitr-Bold'}}>ชื่อที่อยู่</Text>
                        <TextInput 
                            placeholder='ไม่เกิน 20 ตัวอักษร'
                            placeholderTextColor='silver'
                            style = {styles.input}
                            maxLength={20}
                            defaultValue = {name}
                            onChangeText = {setName}/>

                        <View style={{flexDirection:'row',marginTop:10}}>
                            <Pressable
                                style={[styles.button, styles.buttonClose,{marginRight:20}]}
                                onPress={() => {route.params.addItem(name,address,id); navigation.goBack();}}
                            >
                                <Text style={styles.textStyle}>ตกลง</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {setNameModalVisable(prev => !prev); mapRef.current.call('Overlays.clear');}}
                            >
                                <Text style={styles.textStyle}>ยกเลิก</Text>
                            </Pressable>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
            <TouchableHighlight style={styles.addMarkerButton} underlayColor="#973A6E" onPress={addMarker}>
                <View>
                    <Icon name="map-marker" size={48} />
                </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.backButton} underlayColor="grey" onPress={() => navigation.goBack()}>
                <View>
                    <Icon color={'dimgrey'} name="arrow-left" size={36} />
                </View>
            </TouchableHighlight>
        </SafeAreaView>



    )



}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',

    },
    addMarkerButton: {
      position: 'absolute',
      width: 100,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 100,
      top: Dimensions.get('window').height - 150, 
      left: (Dimensions.get('window').width - 100)/2, 
      right: 0, 
      bottom: 0,
      backgroundColor: '#ED89C1',
    },
    backButton: {
        position: 'absolute',
        width: 75,
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 30,
        left: 25, 
        bottom: 30,
        backgroundColor: 'white',
        borderWidth:5,
        borderColor: 'darkgray'
      },
    centeredView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    endView: {
        flex: 1,
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        paddingLeft: 30,
        paddingRight: 30,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        textAlign: "center",
        fontSize:20,
        fontFamily: 'Mitr-Regular'
    },
    addressText: {
        color: 'black',
        fontSize:18,
        fontFamily: 'Mitr-Regular'
    },
    input: { 
        borderBottomWidth: 1,
        alignSelf: 'stretch',
        fontSize:18,
        color:'black',
        fontFamily: 'Mitr-Regular'
    }
  });