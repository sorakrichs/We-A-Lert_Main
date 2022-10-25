import client from '../../client';
import {sessionStorage} from '../../storageControllers'

const memberRegisterController = async (data : {
    username:String,
    password:String,
    name:String,
    surname:String,
    role:'member',
    email:String,
    personalid:String,
    phone:String,
    address: Array<Object>,
    image: Object
    }) => {

    try {
        if(typeof data != 'object') {throw new Error('memberRegisterController: data must be Object') }
        else if(typeof data.username != 'string') {throw new Error('memberRegisterController: data.username must be String') }
        else if(typeof data.password != 'string') {throw new Error('memberRegisterController: data.password must be String') }
        else if(typeof data.name != 'string') {throw new Error('memberRegisterController: data.name must be String') }
        else if(typeof data.surname != 'string') {throw new Error('memberRegisterController: data.surname must be String') }
        else if(typeof data.email != 'string' && data.email != null) {throw new Error('memberRegisterController: data.email must be String or Null') }
        else if(typeof data.personalid != 'string') {throw new Error('memberRegisterController: data.personalId must be String') }
        else if(typeof data.phone != 'string') {throw new Error('memberRegisterController: data.phone must be String') }
        else {

            const fromdata = new FormData();
            if(data.image) {
                fromdata.append('files',{
                    name: data.image.path.split('/').pop(),
                    type: data.image.mime,
                    uri: Platform.OS === 'android' ? data.image.path : data.image.path.replace('file://', '')
                })
            }

            fromdata.append('user',JSON.stringify(data));
            
            const controller = new AbortController();
            let res = null;
            setTimeout(() => {
                if (!res) {
                        
                    controller.abort()

                }
            }, 5000)

            res = await client.post("/member/register",fromdata, {
                signal: controller.signal,
                timeout:5000,
                headers: { 
                    "Content-Type": "multipart/form-data"
                }

            }).then((r) => r).catch((err) => {throw err;});

            return res;
            
        }
    } catch (err) {

        if(err.message == 'canceled')
            throw new Error('req_error_01')
            
        throw err
    }

}

module.exports = memberRegisterController;