import client from '../../client';

const changePasswordBytoken = async (token:String,password:String) => {
    
    const jwtDecode = require('jwt-decode');
    if(typeof token != 'string') {throw new Error('changePasswordBytoken: token must be String') }
    else if(typeof password != 'string') {throw new Error('changePasswordBytoken: password must be String') }
    else {

        let data = {
            password: password
        }
        
        let id = jwtDecode(token)._id;
        let res = await client.post("/member/forgotpass/"+id,data, {
            timeout:5000,
            headers: { 
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }

        }).then((r) => r).catch((err) => {throw err;});

        return res;
        
    }

}

module.exports = changePasswordBytoken;