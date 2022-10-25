import React , { useState,useEffect } from 'react'
import { View , Text , StyleSheet , FlatList , TouchableOpacity, ScrollView} from 'react-native'
import uuid from 'uuid-random';
import { add, onChange } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome'
import Header from '../../subComponant/Header'

const RegisHome = ({route,navigation}) => {

    const {address,setAddress} = route.params
    const [text , setText] = useState('บ้าน');  
    const onChange = textValue => setText(textValue);
    const [items , setItems] = useState(address)
    const [refresh,setRefesh] = useState(0); //ใช้ refesh flatlist

    const deleteItem = (id) => {
        setItems(prevItems => {
            return prevItems.filter(item => item.id != id)
        })
    }

    const addItem = (name,address) => {


        setItems(prevItems => {
            return [...prevItems,{id: uuid(),name,address}];
        })
        
    }
    
    const editItem = (name,address,id) => {

        const index = items.map((o) => o.id).indexOf(id);
        setItems(prevItems => {
            const array = prevItems;
            array[index] = {id: id,name,address};
            return array;
        })
        
        setRefesh(prev => prev+1);
        
    }

    const ListItem = ({item , deleteItem}) => {

        return (
            <View style = {styles.listItem}>
                <TouchableOpacity style = {styles.listItemView} onPress = {() => navigation.navigate('MapRegis',{item:item,addItem: editItem})}>
                    <Text style = {styles.listItemText}>{item.name}</Text>
                    <Icon name = 'remove' size = {20} color = 'firebrick'  style={{flex:1/20}}
                    onPress={() => deleteItem(item.id)}/>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Header
                navigation={navigation}
                title = {'ที่อยู่ของฉัน'}
                color = {'forestgreen'}
            />
            {items.length > 0 ?
            <FlatList data = {items} 
                nestedScrollEnabled
                extraData={refresh}
                renderItem = {({item}) => (<ListItem item = {item} deleteItem = {deleteItem}/>)}
            /> :
            <View style={{flex:1,justifyContent:'center',alignContent:'center'}}>
                <Text style={[styles.text,{color:'dimgray'}]}> ไม่มีที่อยู่ </Text> 
            </View>}
            <View style={{flexDirection:'row',alignItems:'center',backgroundColor: 'white',borderTopWidth:1}}>
                <TouchableOpacity style = {styles.addbtn} onPress = {() => navigation.navigate('MapRegis',{addItem: addItem})}>
                    <Icon name = 'plus' size = {20} style={{position:'absolute', left:'10%', top:'50%'}}/>
                    <Text style = {styles.btnText}>
                    เพิ่มที่อยู่
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.okbtn} onPress = {() => {setAddress(items); navigation.navigate('RegisMember')}}>
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
        backgroundColor : 'aquamarine',
    },
    text : {
        color : '#fff',
        fontSize : 24,
        textAlign : 'center',
        fontFamily:'Mitr-Regular'
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
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily:'Mitr-Regular'
    },
    listItem : {
        paddingLeft:10,
        paddingRight:10,
        marginTop:10,
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
        color: 'dimgray',
        fontFamily:'Mitr-Regular',
    }
})

export default RegisHome;