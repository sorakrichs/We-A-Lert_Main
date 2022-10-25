import React,{useState} from 'react';
import {
  Image, 
  ImageProps,
  StyleSheet,
  TouchableOpacity,
  Modal, 
  View, 
  Text, 
  Pressable,
  Dimensions
  } from 'react-native';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {cameraPermission} from '../../controllers/permissionControllers'
import {pickPicture,useCamera} from '../../controllers/imageControllers'
import { useAlert } from '../../providers/AlertProvider';


const AddImage = ({open,onClose,setImages}) => {

  const {willAlert} = useAlert();

  return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={open}
        onRequestClose={onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.topic}>อัปโหลดรูปภาพ</Text>
            <View style={{flexDirection: 'row',marginTop:10}}>
              <View style={styles.picFolder}>
                <TouchableOpacity
                  onPress={() => {
                    onClose();
                    pickPicture().then((image) => {


                      setImages(image);
                    
                    
                    }).catch((err) => {
                      if (err.code !== 'E_PICKER_CANCELLED') {
                        willAlert('เกิดข้อผิดพลาดขึ้น',err.message);
                      }
                    })}}>
                  <MaterialCommunityIcons name="folder-image" size={60} color={'dimgray'}/>
                </TouchableOpacity>
                <Text style={styles.textStyle}>ภาพจากโฟลเดอร์</Text>
              </View>
              <View style={styles.picCamera}>
                <TouchableOpacity
                  onPress={() => { 
                    onClose();
                    useCamera().then((image) => {
                      setImages(image);
                    })
                    .catch( (err) => {
                      if (err.code !== 'E_PICKER_CANCELLED') {
                        willAlert('เกิดข้อผิดพลาดขึ้น',err.message);
                      }
                    })}}>
                  <MaterialCommunityIcons name="camera" size={60} color={'dimgray'}/>
                </TouchableOpacity>
                <Text style={styles.textStyle}>ภาพจากกล้องถ่ายรูป</Text>
              </View>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose,{marginTop:10}]}
              onPress={onClose}
            >
              <Text style={{fontFamily: 'Mitr-Regular',color:'white'}}>ยกเลิก</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
  );
};

export default AddImage;

const styles = StyleSheet.create({
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
    paddingTop: 20,
    padding: 35,
    paddingBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  picFolder: {
    alignItems: "center",
  },
  picCamera: {
    marginLeft:10,
    alignItems: "center",
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
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "black",
    fontFamily: 'Mitr-Regular',
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: 'Mitr-Regular'
  },
  imageStyle:{

    paddingTop: 20,
    height: 200,
    width: 200,
    borderRadius: 100,
    padding: 20,
 
   },
   topic: {
     color: 'black',
     fontFamily: 'Mitr-Regular',
     fontSize: 20
   }



});