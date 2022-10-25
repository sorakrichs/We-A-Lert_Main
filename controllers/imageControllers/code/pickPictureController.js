
import ImagePicker from 'react-native-image-crop-picker';
import { writeExternalPermission } from '../../permissionControllers';

const pickPicture = async (multiple=false) => {


    try {

        const options = {
            multiple: multiple,
            width: 300,
            height: 300,
            avoidEmptySpaceAroundImage: true,
            mediaType: 'photo'
        }

        let permission = await writeExternalPermission;
        if(permission) {
            let image = await ImagePicker.openPicker(options);
            return image;
        } else {

            throw new Error(`You don't get permision`);

        }


    } catch (err) {
        
        throw err;
    }

};

module.exports = pickPicture;
