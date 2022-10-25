import client from '../../client';
import {getToken} from '../../storageControllers'
const userNotificationController = async (id:String, data :Object) => {

    if(typeof id != 'string') {throw new Error('userNotificationController: id must be string') }
    else if(typeof data != 'object') {throw new Error('userNotificationController: data must be object') }
    else {

        const token = await getToken();
        let res = await client.post("/member/notify/"+id,data,{
            timeout:5000,
            headers: { 
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }

        }).then((r) => r).catch((err) => {throw err;});
        return res;
        
    }

}

    

module.exports = userNotificationController;