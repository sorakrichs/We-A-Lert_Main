import client from '../../client';
import {getToken} from '../../storageControllers'

const banUserController = async (id: String) => {
    
    try {
        if(typeof id != 'string') {throw new Error('editUserDataController: id must be String') }
        else {

            let token = await getToken();
            let res = await client.post("/member/status/"+id,{status:'ban'}, {
                timeout:5000,
                headers: { 
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }

            }).then((r) => r).catch((err) => {throw err;});

            return res;
            
        }
    } catch (err) {

        throw err;
        
    }

}

module.exports = banUserController;