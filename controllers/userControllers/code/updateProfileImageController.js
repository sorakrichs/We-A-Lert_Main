import client from '../../client';
import {sessionStorage} from '../../storageControllers'

const updateProfileImageController = async (
    id: String , 
    image: {
        path: String,
        mime: String
    }
    ) => {

    try {

        const data = new FormData();
        data.append('files',{
            name: image.path.split('/').pop(),
            type: image.mime,
            uri: Platform.OS === 'android' ? image.path : image.path.replace('file://', '')
        })


        const config = {
            timeout: 5000,
            headers : {

                "Content-Type": "multipart/form-data"

            }

        }


        await client.post("/member/updateImage/" + id,data,config)
        .then((res) => {
            
            return res;
            
        })

    } catch(err) {

        throw err;


    }
    
    
}

    

module.exports = updateProfileImageController;