import client from '../../client';
import {getToken} from '../../storageControllers'

const editOrganizeDataController = async (id: String,data:Object) => {
    
    if(typeof id != 'string') {throw new Error('editOrganizeDataController: data must be String') }
    else if(typeof data != 'object') {throw new Error('editOrganizeDataController: data must be Object') }
    else if(typeof data.name != 'string') {throw new Error('editOrganizeDataController: data.name must be String') }
    else if(typeof data.branchname != 'string' && data.email != null) {throw new Error('editOrganizeDataController: data.name must be String or Null') }
    else if(typeof data.email != 'string' && data.email != null) {throw new Error('editOrganizeDataController: data.email must be String or Null') }
    else if(typeof data.description != 'string') {throw new Error('editOrganizeDataController: data.description must be String') }
    else {

        let token = await getToken();
        let res = await client.post("/volunteer/editOrganize/"+id,data, {
            timeout:5000,
            headers: { 
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }

        }).then((r) => r).catch((err) => {throw err;});

        return res;
        
    }

}

module.exports = editOrganizeDataController