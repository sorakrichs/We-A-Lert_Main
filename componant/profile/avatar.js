import React,{useState} from 'react';
import {Image, ImageProps, StyleSheet, TouchableOpacity, Modal, View, Text, Pressable} from 'react-native';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddImages from '../misc/AddImages'




export const Avatar = ({image,setImage}) => {

    const [modalVisible, setModalVisible] = useState(false);

  return (
    <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
            style={styles.avatar}
            source={image ? {uri : (image?.path) ? image.path : image} : require('../../assets/profile/default_user.png')}
        />
        <AddImages open={modalVisible} onClose={() => setModalVisible(false)} setImages= {setImage} />
      
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatar: {
    paddingTop: 20,
    height: 200,
    width: 200,
    borderRadius: 100,
    padding: 20,
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
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
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
    backgroundColor: "#FF605C",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  imageStyle:{

    paddingTop: 20,
    height: 200,
    width: 200,
    borderRadius: 100,
    padding: 20,
 
   }



});

const options = {
  width: 300,
  height: 400,
  cropping: true,
}