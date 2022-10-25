import client from '../../client';
import {sessionStorage} from '../../storageControllers'

const memberLoginController = async (data : {
    usernameorphone : String,
    password : String
    }) => {
    const jwtDecode = require('jwt-decode');

    try {

        if(typeof data != 'object') {throw new Error('memberLogin: data must be Object') }
        else if(typeof data.usernameorphone != 'string') {throw new Error('memberLogin: data.username must be String') }
        else if(typeof data.password != 'string') {throw new Error('memberLogin: data.password must be String') }
        else {
            
            const controller = new AbortController();
            let res = null;
            setTimeout(() => {
                if (!res) {
                    
                    controller.abort()
                }
            }, 5000)

            res = await client.post("/member/login",data, {
                signal: controller.signal,
                timeout: 5000,
                headers: { 
                    "Content-Type": "application/json"
                }

            }).then((r) => r).catch((err) => {throw err;});
            
            await sessionStorage(res.data).catch((err) => {throw err});
            let decode = await jwtDecode(res.data);
            return decode;
        }

    } catch(err) {

        if(err.message == 'canceled')
            throw new Error('req_error_01')

        throw err
    }

}

module.exports = memberLoginController;