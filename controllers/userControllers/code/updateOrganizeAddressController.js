import client from '../../client';
import {getToken} from '../../storageControllers'

const updateOrganizeAddress = async (id:String, data :Object) => {

    if(typeof data != 'object') {throw new Error('updateAddressController: data must be object') }
    else {

        let token = await getToken();
        let res = await client.post("/volunteer/updateAddress/"+id, data, {
            timeout:5000,
            headers: { 
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }

        }).then((r) => r).catch((err) => {throw err;});

        return res;
        
    }

}

    

module.exports = updateOrganizeAddress;