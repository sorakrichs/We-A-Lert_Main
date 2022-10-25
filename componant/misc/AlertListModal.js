import React, { useState } from "react";
import { Button, Text, View, StyleSheet,Dimensions,TouchableOpacity,SafeAreaView,SectionList } from "react-native";
import Modal from "react-native-modal";
import {useAlert} from "../../providers/AlertProvider"
import {useMap} from "../../providers/MapProvider"
import Icon from 'react-native-vector-icons/AntDesign'



const AlertListModal = ({ open, onClose}) => {

    const {willAlert,alertStack,reciveReport} = useAlert();
    const {volunteerAcceptReport,getValidateMarker,getReportMarker} = useMap();

    const ItemSeparatorView = () => {
        return (
          // Flat List Item Separator
          <View
            style={{
              height: 5,
              marginHorizontal: 12,
            }}
          />
        );
    };

    const notitypeTranslate = (text) => {
        switch(text) {
            case ('normal') :
                return 'ทั่วไป'
            break;
            case ('report') :
                return 'รายงาน'
            break;
            case ('recive_report') :
                return 'รายงานถูกรับเรื่อง'
            break;
            default:
                return 'เกิดอุบัติภัย'
        }
    }

    const dateTranslate = (text) => {

        if(typeof text === 'string')
            text = new Date(text)

        let time = Math.ceil((new Date().getTime() - text.getTime())/1000)
        if(time < 60)
            return `ไม่กี่วินาทีที่แล้ว`
        
        if(time < 60*60)
            return `${Math.ceil(time/60)} นาทีที่แล้ว`

        if(time < 60*60*24)
            return `${Math.ceil(time/3600)} ชั่วโมงที่แล้ว`

        return `${Math.ceil(time/(60*60*24))} วันที่แล้ว`
    }

    const compareDate = (text,days) => {

        if(typeof text === 'string')
            text = new Date(text)

        let time = Math.ceil((new Date().getTime() - text.getTime())/1000)

        if(time/(60*60*24) >= days)
            return true

        return false;
    }

    const Item = ({data}) => {
        return (
            <>
            {   data.type == 'normal' ?
                <View style={styles.item}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.descText,{fontFamily:'Mitr-Bold'}]}>
                            หัวข้อ:
                        </Text>
                        <Text style={styles.descText}>
                            {` ${data.title}`}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.descText,{fontFamily:'Mitr-Bold'}]}>
                           คำอธิบาย:
                        </Text>
                        <Text style={[styles.descText,{width: "60%"}]}>
                            {` ${data.body}`}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.descText,{fontFamily:'Mitr-Bold'}]}>
                           ประเภท:
                        </Text>
                        <Text style={[styles.descText]}>
                            {` ${notitypeTranslate(data.type)}`}
                        </Text>
                    </View>
                    <View style={{marginLeft: 'auto'}}>
                        <Text style={[styles.descText]}>
                            {` ${dateTranslate(data?.time)}`}
                        </Text>
                    </View>
                </View> : 
                data.type == 'report' ?
                <TouchableOpacity style={[styles.item,{backgroundColor: (data?.isclicked) ? 'lightgray' : 'floralwhite'}]} onPress={
                    async () => {

                            try {
                                if(!compareDate(data?.time,1)){
                                    await reciveReport(
                                        JSON.parse(data.location),
                                        data["gcm.notification.body"],
                                        {id: data.userid, username: data.username,phone: data.phone},
                                        JSON.parse(data.imageUrl),data.id
                                    )
                                    data.isclicked = true
                                } else {
                                    willAlert('แจ้งเตือน','รายงานหมดอายุแล้ว');
                                }

                            } catch (err) {
                                willAlert('เกิดข้อผิดพลาดขึ้น',(err?.response?.data?.message) ? err?.response?.data?.message : err?.message);
                            } finally {
                                onClose();
                            }

                        } 
                    }>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.descText,{fontFamily:'Mitr-Bold'}]}>
                        หัวข้อ:
                        </Text>
                        <Text style={styles.descText}>
                            {` ${data.title}`}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.descText,{fontFamily:'Mitr-Bold'}]}>
                        คำอธิบาย:
                        </Text>
                        <Text style={[styles.descText,{width: "60%"}]}>
                            {` ${data.body}`}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.descText,{fontFamily:'Mitr-Bold'}]}>
                        ประเภท:
                        </Text>
                        <Text style={[styles.descText,{color: 'red'}]}>
                            {` ${notitypeTranslate(data.type)}`}
                        </Text>
                    </View>
                    <View style={{marginLeft: 'auto'}}>
                        <Text style={[styles.descText]}>
                            {` ${dateTranslate(data.time)}`}
                        </Text>
                    </View>
                </TouchableOpacity> :
                data.type == 'recive_report' ?
                <TouchableOpacity style={[styles.item,{backgroundColor: (data?.isclicked) ? 'lightgray' : 'floralwhite'}]} onPress={
                    async () => {

                            try {
                                await volunteerAcceptReport(
                                    data.report_id,
                                    {id: data.volunteer_id,name: data.volunteer_name,phone: data.volunteer_phone}
                                )
                                data.isclicked = true
                            } catch (err) {
                                willAlert('เกิดข้อผิดพลาดขึ้น',(err?.response?.data?.message) ? err?.response?.data?.message : err?.message);
                            } finally {
                                onClose();
                            }

                        } 
                    }>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.descText,{fontFamily:'Mitr-Bold'}]}>
                        หัวข้อ:
                        </Text>
                        <Text style={styles.descText}>
                            {` ${data.title}`}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.descText,{fontFamily:'Mitr-Bold'}]}>
                        คำอธิบาย:
                        </Text>
                        <Text style={[styles.descText,{width: "60%"}]}>
                            {` ${data.body}`}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.descText,{fontFamily:'Mitr-Bold'}]}>
                        ประเภท:
                        </Text>
                        <Text style={[styles.descText,{color: 'green'}]}>
                            {` ${notitypeTranslate(data.type)}`}
                        </Text>
                    </View>
                    <View style={{marginLeft: 'auto'}}>
                        <Text style={[styles.descText]}>
                            {` ${dateTranslate(data.time)}`}
                        </Text>
                    </View>
                </TouchableOpacity> :
                data.type == 'isvalidated' ?
                <TouchableOpacity style={[styles.item,{backgroundColor: (data?.isclicked) ? 'lightgray' : 'floralwhite'}]} onPress={
                    async () => {

                            try {
                                await getValidateMarker(data.id)
                                data.isclicked = true
                            } catch (err) {
                                willAlert('เกิดข้อผิดพลาดขึ้น',(err?.response?.data?.message) ? err?.response?.data?.message : err?.message);
                            } finally {
                                onClose();
                            }

                        } 
                    }>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.descText,{fontFamily:'Mitr-Bold'}]}>
                        หัวข้อ:
                        </Text>
                        <Text style={styles.descText}>
                            {` ${data.title}`}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.descText,{fontFamily:'Mitr-Bold'}]}>
                        คำอธิบาย:
                        </Text>
                        <Text style={[styles.descText,{width: "60%"}]}>
                            {` ${data.body}`}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.descText,{fontFamily:'Mitr-Bold'}]}>
                        ประเภท:
                        </Text>
                        <Text style={[styles.descText,{color: 'green'}]}>
                            {` ${notitypeTranslate(data.type)}`}
                        </Text>
                    </View>
                    <View style={{marginLeft: 'auto'}}>
                        <Text style={[styles.descText]}>
                            {` ${dateTranslate(data.time)}`}
                        </Text>
                    </View>
                </TouchableOpacity> :
                <TouchableOpacity style={[styles.item,{backgroundColor: (data?.isclicked) ? 'lightgray' : 'floralwhite'}]} onPress={
                    async () => {

                            try {
                                await getReportMarker(data.id)
                                data.isclicked = true
                            } catch (err) {
                                willAlert('เกิดข้อผิดพลาดขึ้น',(err?.response?.data?.message) ? err?.response?.data?.message : err?.message);
                            }

                        } 
                    }>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.descText,{fontFamily:'Mitr-Bold'}]}>
                        หัวข้อ:
                        </Text>
                        <Text style={styles.descText}>
                            {` ${data.title}`}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.descText,{fontFamily:'Mitr-Bold'}]}>
                        คำอธิบาย:
                        </Text>
                        <Text style={[styles.descText,{width: "60%"}]}>
                            {` ${data.body}`}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.descText,{fontFamily:'Mitr-Bold'}]}>
                        ประเภท:
                        </Text>
                        <Text style={[styles.descText,{color: 'darkgoldenrod'}]}>
                            {` ${notitypeTranslate(data.type)}`}
                        </Text>
                    </View>
                    <View style={{marginLeft: 'auto'}}>
                        <Text style={[styles.descText]}>
                            {` ${dateTranslate(data.time)}`}
                        </Text>
                    </View>
                </TouchableOpacity>
                

            }
            </>
        );
    };

    const DATA = [
        {
          data: alertStack.map(item => item),
        },
    ];
    

    return (
        <Modal style={styles.centeredView} isVisible={open}>
            <SafeAreaView style= {styles.modalView}>
                <View style = {{flexDirection:'row', borderBottomColor: 'black',borderBottomWidth: 1,marginTop:10}}>
                    <Icon color='dimgray' name='notification' size={20}/>
                    <Text style={styles.titleText}>การแจ้งเตือน </Text>
                </View>
                <SectionList
                    sections={DATA}
                    keyExtractor={(item, index) => item + index}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                    ItemSeparatorComponent={ItemSeparatorView}
                    maxToRenderPerBatch={2}
                    onEndReachedThreshold={0.5}
                    stickySectionHeadersEnabled={false}
                    renderItem={({item}) => <Item data={item} />}
                    style={{margin:10,width:'100%'}}
                />
                <TouchableOpacity style={[styles.button,{marginTop:10,marginBottom:10,backgroundColor: 'lightblue'}]} onPress = {onClose}>
                    <Text style={styles.bottonText}>ตกลง</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </Modal>
        )
}


export default AlertListModal;

const styles = StyleSheet.create({
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        height: '70%',
        width:'90%',
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    LocationView: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 30,
        width: '100%',
        alignItems: "center",
        justifyContent: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        top: 0, left: 0, right: 0, bottom: 0,
        position: 'absolute'
    },
    bottomView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        left: 0, right: 0,bottom: 0,
        position: 'absolute'
    },
    titleText: {
        fontFamily: 'Mitr-Bold', 
        fontSize:20,
        bottom:1,
        color:'dimgray'
    },
    descText: {
        fontSize: 16,
        fontFamily: 'Mitr-Regular',
        color: 'dimgray'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        paddingLeft:50,
        paddingRight:50,
        
    },
    bottonText: {
        fontSize:18,
        fontFamily: 'Mitr-Regular',
    },
    item: {
        borderWidth: 1,
        paddingHorizontal: 30,
        backgroundColor: 'floralwhite'
    }
})