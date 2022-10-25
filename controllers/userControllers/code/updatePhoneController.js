import client from '../../client';
import {getToken} from '../../storageControllers'

const updatePhoneController = async (id:String, phone :Array<String>) => {

    if(!Array.isArray(phone)) {throw new Error('updatePhoneController: data must be object') }
    else {

        let token = await getToken();
        let res = await client.post("/volunteer/updatePhone/"+id, phone, {
            timeout:5000,
            headers: { 
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }

        }).then((r) => r).catch((err) => {throw err;});

        return res;
        
    }

}

    

module.exports = updatePhoneController ;