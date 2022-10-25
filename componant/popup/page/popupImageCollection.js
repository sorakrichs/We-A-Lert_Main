import React, { useState,useMemo } from "react";
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
    Image,
    ScrollView
    } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageSwiper from '../../misc/ImageSwiper'

const ImageCollection = ({images = [],onClose}) => {

    const [imageSwipeVisible,setImageSwipeVisible] = useState(false);
    const [imageIndex,setImageIndex] = useState(0);
    
    useMemo(async () => {

        
        if(typeof images[0] == 'string')
            images.forEach( (image, i) => {

                let url = image.replace("localhost","10.0.2.2");
                images[i] = url;
            })
        
            console.log(images)


    },[])

    return (
        <View>
            <ImageSwiper open={imageSwipeVisible} onClose={()=> setImageSwipeVisible(false)} images={images} imageIndex={imageIndex}/>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>รูปภาพ</Text>
                <View style={{flex:1}}>
                { images.length > 0 ?
                <ScrollView>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        {images.map((image,index) => 
                            <TouchableOpacity key={index} onPress={() => {setImageIndex(index); setImageSwipeVisible(true);}}>
                                <Image key={index} style={styles.avatar} source={{ uri:(image?.path) ? image?.path : image }}/>
                            </TouchableOpacity>
                        )}
                    </View>  
                 </ScrollView> :
                <View style={{alignItems:"center",justifyContent:"center",flex:1}}>
                    <Text style={{fontSize:22,fontFamily: 'Mitr-Regular',color: 'dimgray'}}> ยังไม่มีรูปภาพ </Text>
                </View> }
                <View style={{alignItems:"center",justifyContent:"center"}}>
                    <TouchableOpacity style={[styles.recButton, styles.buttonOpen]} onPress={onClose}>
                        <Text style={styles.textStyle}>ตกลง</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
        </View>
    )
}

export default ImageCollection;

const styles = StyleSheet.create({
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 4
        },
        width: (Dimensions.get('window').width) *0.8,
        height: (Dimensions.get('window').height) *0.8,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        fontFamily: 'Mitr-Bold',
        color: 'dimgray',
        marginBottom: 15,
        fontSize: 20,
        textAlign: "center"
    },
    buttonText:{
        fontFamily: 'Mitr-Bold',
        color: 'white',
        fontSize: 16,
        marginTop: 5,
    }, 
    recButton: {
        backgroundColor: "lightblue",
        borderColor: 'black',
        padding: 10,
        elevation: 2
    },
    avatar: {
        paddingTop: 20,
        height: 75,
        width: 75,
        marginTop:5,
        marginLeft:5,
        padding: 20,
    }
})