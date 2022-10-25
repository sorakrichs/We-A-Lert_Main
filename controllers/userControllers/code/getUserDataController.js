import client from '../../client';
import {getToken} from '../../storageControllers'
const getUserDataController = async (id: String) => {
    
    try {

        let token = await getToken();
        if(typeof id != 'string') {throw new Error('getUserDataController: id must be String') }
        else {
            
            let res = await client.get("/member/profile/"+id, {
                timeout: 5000,
                headers: { 
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            

            }).then((r) => r).catch((err) => {throw err;});

            return res.data;
        }

    } catch (err) {

        throw err;

    }

}

module.exports = getUserDataController;