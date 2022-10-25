import client from '../../client';

const getOrganizeDataController= async (data : {
        id: String,
        usernameorphone : String,
        password: String
    }) => {
    
    const jwtDecode = require('jwt-decode');

    if(typeof data != 'object') {throw new Error('getOrganizeDataController: data must be Object') }
    else if(typeof data.usernameorphone != 'string') {throw new Error('getOrganizeDataController: data.usernameorphone must be String') }
    else {
        
        let res = await client.post("/volunteer/getOrganize",data, {
            timeout: 1000,
            headers: { 
                "Content-Type": "application/json"
            }

        }).then((r) => r).catch((err) => {throw err;});
        

        return res.data;
    }

}

module.exports = getOrganizeDataController;