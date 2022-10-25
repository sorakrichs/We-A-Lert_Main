import client from '../../client';
import {getToken} from '../../storageControllers'

const editUserPasswordController = async (id: String,data:Object) => {
    

    if(typeof id != 'string') {throw new Error('editUserPasswordController: data must be String') }
    else if(typeof data != 'object') {throw new Error('editUserPasswordController: data must be Object') }
    else if(typeof data.oldpassword != 'string') {throw new Error('editUserPasswordController: data.oldpassword must be String') }
    else if(typeof data.password != 'string') {throw new Error('editUserPasswordController: data.password must be String') }
    else {

        let token = await getToken();
        let res = await client.post("/member/changepass/"+id,data, {
            timeout:5000,
            headers: { 
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }

        }).then((r) => r).catch((err) => {throw err;});

        return res;
        
    }

}

module.exports = editUserPasswordController;