import React , { useState,useEffect } from 'react'
import { View , Text , StyleSheet , FlatList , TouchableOpacity, ScrollView} from 'react-native'
import uuid from 'uuid-random';
import { add, onChange } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome'
import Input from '../../subComponant/Input';
import Modal from "react-native-modal";
import Header from '../../subComponant/Header'
import { useAuth } from '../../../providers/AuthProvider';
import { useAlert } from '../../../providers/AlertProvider';

const RegisHome = ({route,navigation}) => {

    const {phone,setPhone,organizeId} = route.params
    const [text , setText] = useState('บ้าน');  
    const onChange = textValue => setText(textValue);
    const [items , setItems] = useState(phone)
    const [refresh,setRefesh] = useState(0); //ใช้ refesh flatlist
    const [open,setOpen] = useState(false);
    const [error , setError] = useState(false)
    const {updateOrganizePhone} = useAuth();
    const {willAlert} = useAlert();
    const updatePhone = async () => {

        try {
            await updateOrganizePhone(organizeId,items)
            setPhone(items); 
            setTimeout(() => {
                willAlert('บันทึกข้อมูลเรียบร้อย','');
            },100)
            navigation.goBack();
        } catch(err) {
            setTimeout(() => {
                willAlert('เกิดข้อผิดพลาดขึ้น',(err?.response?.data?.message) ? err?.response?.data?.message : err?.message);
            },100)
        }
        
    }


    const deleteItem = (id) => {
        setItems(prevItems => {
            return prevItems.filter(item => item.id != id)
        })
    }

    const addItem = (phone) => {


        setItems(prevItems => {
            return [...prevItems,{id: uuid(),phone}];
        })
        
    }



    const ListItem = ({item , deleteItem}) => {

        return (
            <View style = {styles.listItem}>
                <View style = {styles.listItemView}>
                    <Text style = {styles.listItemText}>{item?.phone}</Text>
                    <Icon name = 'remove' size = {20} color = 'firebrick'  style={{flex:1/20}}
                    onPress={() => deleteItem(item?.id)}/>
                </View>
            </View>
        )
    }

    const PhoneModal = () => {

        const [phoneNum,setPhoneNum] = useState('');
        const [isValid,setIsValid] = useState(new Map([[0,false],[1,false]]));

        return (
            <Modal style={styles.centeredView} isVisible={open} onBackButtonPress={() => setOpen(false)} backdropOpacity={0}>
                <View style={styles.modalView}>
                    <Text style={{color:'black',fontSize:20,fontFamily: 'Mitr-Bold'}}>ใส่หมายเลขโทรศัพท์</Text>
                    <View style={styles.inputContainer}>
                        <Input style={styles.inputs}
                            placeholder="หมายเลขโทรศัพท์"
                            keyboardType="decimal-pad"
                            underlineColorAndroid='transparent'
                            pattern= {[
                            '^[0-9]{10}$',
                            '^(0[689]{1})+([0-9]{8})+$',
                            ]}
                            onValidation = {(checkValid) => checkValid.map( (number,index) => {
                                setIsValid(isValid.set(index,number));
                            })}
                            onChangeText = {phone => setPhoneNum(phone)}
                            value = {phoneNum}
                        />
                    </View>
                    <View>
                        { !isValid.get(0) && error ? <Text style = {styles.errorText}>
                        หมายเลขโทรศัพท์ไม่ครบ 10 ตัว
                        </Text> : null}
                    </View>
                    <View>
                        { !isValid.get(1) && error? <Text style = {styles.errorText}>
                        หมายเลขโทรศัพท์ผิดรูปแบบในประเทศไทย
                        </Text> : null}
                    </View>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <TouchableOpacity
                            style={[styles.button,{marginRight:20,backgroundColor:'green'}]}
                            onPress={ () => {

                                if(isValid.get(0) && isValid.get(1)) {
                                    addItem(phoneNum);
                                    setOpen(false);
                                    setError(false)
                                } else
                                    setError(true)
    
    
                            }}
                        >
                            <Text style={styles.btnText}>ตกลง</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button,{backgroundColor:'red'}]}
                            onPress={() => {setOpen(false); setError(false);}}
                        >
                            <Text style={styles.btnText}>ยกเลิก</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

    return (
        <View style={styles.container}>
            <Header
                navigation={navigation}
                title = {'หมายเลขโทรศัพท์ของหน่วยงาน'}
                color = {'chocolate'}
            />
            <PhoneModal/>
            {items.length > 0 ?
            <FlatList data = {items} 
                nestedScrollEnabled
                extraData={refresh}
                renderItem = {({item}) => (<ListItem item = {item} deleteItem = {deleteItem}/>)}/> :
                <View style={{flex:1,justifyContent:'center',alignContent:'center'}}>
                    <Text style={[styles.text,{color:'dimgray'}]}> ไม่มีเบอร์โทรศัพท์ </Text> 
                </View>
            }
            <View style={{flexDirection:'row',alignItems:'center',backgroundColor: 'white',borderTopWidth:1}}>
                <TouchableOpacity style = {styles.addbtn} onPress = {() => setOpen(true)}>
                    <Icon name = 'plus' size = {20} style={{flex:2/5}}/>
                    <Text style = {styles.btnText}>
                        เพิ่มเบอร์
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.okbtn} 
                onPress = {async () => {
                    willAlert(
                        'ยืนยันที่การแก้ไขหมายเลขโทรศัพท์',
                        'กรุณาตรวจสอบหมายเลขโทรศัพท์', 
                        async () => await updatePhone, 
                        null
                        ,'ask'
                    )
                }}>
                    <Text style = {styles.btnText}>
                        ตกลง 
                    </Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#F3B15A',
    },
    header : {
        height : 60,
        padding : 15,
        marginBottom:10,
        backgroundColor : 'darkcyan'
    },
    text : {
        color : '#fff',
        fontSize : 24,
        textAlign : 'center',
        color: 'black'
    },
    input : {
        height : 60,
        padding : 8,
        fontSize : 16,
        color: 'black'
    },
    addbtn : {
        backgroundColor : 'coral',
        padding : 10 ,
        margin : 10,
        flex:1/2,
        flexDirection:'row',
        alignItems:'center',
        borderRadius:3

    },
    okbtn : {
        backgroundColor : 'darkgreen',
        padding : 10 ,
        margin : 10,
        flex:1/2,
        alignItems:'center',
        borderRadius:3

    },
    btnText : {
        color : 'white',
        fontSize : 20,
        alignSelf : 'center',
        fontFamily: 'Mitr-Regular'
    
    },
    listItem : {
        marginTop:10,
        paddingLeft:10,
        paddingRight:10,
        borderBottomWidth : 1,
        borderColor : '#eee'
    },
    listItemView : {
        padding:10,
        backgroundColor : '#f8f8f8',
        flexDirection : 'row',
        borderWidth : 1,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2,
        borderRadius:3,
        marginBottom:2
        
    },
    listItemText : {
        fontSize : 18,
        flex:19/20,
        fontFamily: 'Mitr-Regular',
        color: 'dimgray'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
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
    errorText: {
        color: 'red',
        fontSize: 14,
        textAlign:'center',
        marginBottom : 10,
        fontFamily: 'Mitr-Regular'
    },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius:5,
        width: 250,
        borderBottomWidth: 1,
        marginBottom:10,
        alignSelf:'center'
    },
    inputs:{
        color: 'black',
        borderBottomColor: '#FFFFFF',
        fontFamily: 'Mitr-Regular'
    },
})

export default RegisHome;