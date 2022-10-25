import React , { useState,useEffect } from 'react'
import { View , Text , StyleSheet , FlatList , TouchableOpacity, ScrollView,Image} from 'react-native'
import uuid from 'uuid-random';
import { add } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome'
import {role} from '../../../controllers/miscControllers'
import Header from '../../subComponant/Header'
import { useAlert } from '../../../providers/AlertProvider';

const RegisVolunteerList = ({route,navigation}) => {

    const {members,setMembers} = route.params
    const [items , setItems] = useState(members)
    const [refresh,setRefesh] = useState(0); //ใช้ refesh flatlist
    const [hasBoss,setHasBoss] = useState(false);
    const {willAlert} = useAlert();

    const deleteItem = (id) => {

        const index = items.map((o) => o.id).indexOf(id);

        setItems(prevItems => {
            const array = prevItems;
            if(array[index]?.member?.teamrole == 'leader')
                setHasBoss(false)
            return prevItems.filter(item => item.id != id)
        })
    }
    
    const addMember = (member) => {

        if(items.find(element => { return element.username === member?.username || element.personalid === member?.personalid || element.phone === member?.phone})) {
            willAlert('ชื่อบัญชี, เลขบัตรประชาชน หรือ หมายเลขโทรศัพท์ซ้ำ','')
        } else {

            if(member?.teamrole == 'leader')
                setHasBoss(true);

            setItems(prevItems => {
                return [...prevItems,{id: uuid(),member}];
            })
        }
        
    }
    
    const editMember = (member,id) => {


        
        const index = items.map((o) => o.id).indexOf(id);

        if(items.find((element,indexs) => { return (element.username === member?.username || element.personalid === member?.personalid || element.phone === member?.phone) && indexs != index})) {
            willAlert('ชื่อบัญชี, เลขบัตรประชาชน หรือ หมายเลขโทรศัพท์ซ้ำ','')
        } else {

            setItems(prevItems => {
                const array = prevItems;
                if(array[index]?.member?.teamrole != member?.teamrole)
                    (member?.teamrole == 'leader') ? setHasBoss(true) : setHasBoss(false);
                array[index] = {id: id,member};
                return array;
            })
            setRefesh(prev => prev+1);
            
        }
        
    }

    const ListItem = ({item , deleteItem}) => {

        return (
            <View style = {styles.listItem}>
                <View style = {styles.listItemView}>
                    <View style={{flexDirection:'row'}}>
                        <Image style={{height: 100,width: 100,padding: 20}} source={{uri:item?.member?.image?.path}}/>
                            <View style={{flexDirection:'column',paddingLeft:10}}>
                                <Text style={styles.detailtext}>ชื่อบัญชี: {item.member.username}</Text>
                                <Text style={styles.detailtext}>ชื่อ-นามสกุล: {item.member.name} {item.member.surname}</Text>
                                <Text style={styles.detailtext}>หมายเลขโทรศัพท์: {item.member.phone}</Text>
                                <Text style={styles.detailtext}>ตำแหน่ง: {role.getRole(item.member.teamrole)}</Text>
                            </View>
                    </View>
                    <View style={{flexDirection:'row-reverse'}}>
                        <Icon name = 'remove' size = {30} color = 'firebrick'  style={{}}
                        onPress={() => deleteItem(item.id)}/>
                        <Icon name = 'edit' size = {25} color = 'black'  style={{padding:5}}
                        onPress={() => navigation.navigate('RegisMember',{itemid:item.id,member:item.member,addMember: editMember})}/>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>

            <Header
                navigation={navigation}
                title = {'สมาชิก'}
                color = {'chocolate'}
            />
            {items.length > 0 ?
            <FlatList data = {items} 
                nestedScrollEnabled
                extraData={refresh}
                renderItem = {({item}) => (<ListItem item = {item} deleteItem = {deleteItem}/>)}/> :
                <View style={{flex:1,justifyContent:'center',alignContent:'center'}}>
                    <Text style={[styles.text,{color:'dimgray'}]}> ไม่มีสมาชิก </Text> 
                </View>
            }
            <View style={{flexDirection:'row',alignItems:'center',backgroundColor: 'white',borderTopWidth:1}}>
                <TouchableOpacity style = {styles.addbtn} onPress = {() => navigation.navigate('RegisMember',{addMember: addMember,hasBoss: hasBoss})}>
                    <Icon name = 'plus' size = {20} style={{flex:2/5}}/>
                    <Text style = {styles.btnText}>
                    เพิ่มสมาชิก
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.okbtn} onPress = {() => {
                    try {
                        if(hasBoss) {
                            setMembers(items); 
                            navigation.navigate('RegisOrganize')
                        } else {
                            willAlert('แจ้งเตือน','ต้องมีอาสาสมัครตำแหน่งหัวหน้าในทีมด้วย')
                        }
                    } catch(err) {
                        willAlert('เกิดข้อผิดพลาดขึ้น',err.message)
                    }
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
        backgroundColor: '#F3B15A',
    },
    header : {
        height : 60,
        padding : 15,
        marginBottom:10,
        backgroundColor : 'darkcyan'
    },
    headerText : {
      color : '#fff',
      fontSize : 24,
      textAlign : 'center',
      fontFamily: 'Mitr-Bold'
    },    
    text : {
        color : '#fff',
        fontSize : 24,
        textAlign : 'center'
    },
    input : {
        height : 60,
        padding : 8,
        fontSize : 16
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
        paddingLeft:10,
        paddingRight:10,
        borderBottomWidth : 1,
        borderColor : '#eee'
    },
    listItemView : {
        padding:10,
        backgroundColor : '#f8f8f8',
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
    detailtext : {
        fontSize : 14,
        textAlign : 'center',
        color: 'dimgray',
        fontFamily: 'Mitr-Regular'
    }
})

export default RegisVolunteerList;