import client from '../../client';
import {getToken} from '../../storageControllers'

const editUserDataController = async (id: String,data:Object) => {
    
    if(typeof id != 'string') {throw new Error('editUserDataController: id must be String') }
    else if(typeof data != 'object') {throw new Error('editUserDataController: data must be Object') }
    else if(typeof data.username != 'string') {throw new Error('editUserDataController: data.username must be String') }
    else if(typeof data.name != 'string') {throw new Error('editUserDataController: data.name must be String') }
    else if(typeof data.surname != 'string') {throw new Error('editUserDataController: data.surname must be String') }
    else if(typeof data.email != 'string' && data.email != null) {throw new Error('editUserDataController: data.email must be String or Null') }
    else if(typeof data.personalid != 'string') {throw new Error('editUserDataController: data.personalId must be String') }
    else if(typeof data.phone != 'string') {throw new Error('editUserDataController: data.phone must be String') }
    else {
        
        let token = await getToken();
        let res = await client.post("/member/edit/"+id,data, {
            timeout:5000,
            headers: { 
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }

        }).then((r) => r).catch((err) => {throw err;});

        return res;
        
    }

}

module.exports = editUserDataController;