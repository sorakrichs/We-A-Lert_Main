import React, { useState,useEffect,useMemo } from "react";
import {
    View,
    Text,
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
    import Icon from 'react-native-vector-icons/Ionicons';
import AddImages from "../../misc/AddImages";
import ImageSwiper from '../../misc/ImageSwiper'
import {useReport} from '../../../providers/ReportProvider'
import {pickPicture,useCamera} from '../../../controllers/imageControllers'

const ImageCollection = ({navigation}) => {

    const [addImageVisible,setAddImageVisible] = useState(false);
    const [imageSwipeVisible,setImageSwipeVisible] = useState(false);
    const [imageIndex,setImageIndex] = useState(0);
    const {images,pushImage,setPage} = useReport();

    useMemo(async () => {

        
        if(images && typeof images[0] == 'string')
            images.forEach( (image, i) => {

                let url = image.replace("localhost","10.0.2.2");
                images[i] = url;
            })


    },[])


    return (
        <SafeAreaView style={styles.container}>
            <View style={ styles.topView } >
                <Icon style={ styles.iconBack } name = {'chevron-back'} size = {28} onPress={() => navigation.goBack()} />
                <View>
                    <Text style = {styles.title}>รูปภาพ</Text>
                </View>
            </View>
            <ImageSwiper open={imageSwipeVisible} onClose={()=> setImageSwipeVisible(false)} images={images} imageIndex={imageIndex}/>
            <View style={{flex:1,margin:10,backgroundColor:'white',borderRadius:5}}>
                { images && images.length > 0 ?
                <ScrollView>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        {images?.map((image,index) => 
                            <TouchableOpacity key={index} onPress={() => {setImageIndex(index); setImageSwipeVisible(true);}}>
                                <Image key={index} style={styles.avatar} source={{ uri:(image?.path) ? image?.path : image }}/>
                            </TouchableOpacity>
                        )}
                    </View>  
                 </ScrollView> :
                <View style={{alignItems:"center",justifyContent:"center",flex:1}}>
                    <Text style={{fontSize:22,fontFamily: 'Mitr-Regular',color: 'dimgray'}}> ยังไม่มีรูปภาพ </Text>
                </View> }
                    
            </View>
            <View style={{flexDirection:'row',alignItems:'center',backgroundColor: 'white'}}>
                <TouchableOpacity style={styles.okbtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.okText}>ตกลง</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ImageCollection;

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
        marginBottom: 10
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
        fontFamily: 'Mitr-Bold',
        fontSize: 18,
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
    addImagesButton : {
        flexDirection:"row",
        padding : 10 ,
        margin : 5,
        flex:1/2,
        alignItems:'center',
        justifyContent: "center",
        borderRadius:10
    },
    textStyle:{
        textAlign:'center',
        fontSize: 16,
        fontFamily: 'Mitr-Bold'
    },
    iconStyle:{
        position:'absolute',
        left:10
    },
    addressText: {
        fontSize: 16,
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
    okbtn : {
        backgroundColor : 'springgreen',
        padding : 10 ,
        margin : 10,
        flex:1,
        alignItems:'center',
        borderRadius:10
    },
    okText:{
        color:'white',
        fontSize:20,
        fontFamily: 'Mitr-Bold'
    },
    avatar: {
        paddingTop: 20,
        height: 90,
        width: 90,
        marginTop:5,
        marginLeft:5,
    }
  });