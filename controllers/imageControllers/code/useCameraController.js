
import ImagePicker from 'react-native-image-crop-picker';
import { cameraPermission } from '../../permissionControllers';
const useCamera = async () => {
    try {

        let permission = await cameraPermission;

        if(permission) {

            let image = await ImagePicker.openCamera(options);
            return image;

        } else {

            throw new Error(`You don't get permision`);

        }

    } catch (err) {
        throw err;
    }
}

module.exports = useCamera;

const options = {
    width: 50,
    height: 50,
  }