import client from '../../client';
import {getToken} from '../../storageControllers'

const updateAddressController = async (id:String, data :Object) => {

    if(typeof data != 'object') {throw new Error('updateAddressController: data must be object') }
    else {

        let token = await getToken();
        let res = await client.post("/member/address/"+id,data, {
            timeout:5000,
            headers: { 
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }

        }).then((r) => r).catch((err) => {throw err;});

        return res;
        
    }

}

    

module.exports = updateAddressController;