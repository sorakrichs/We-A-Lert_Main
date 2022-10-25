import client from '../../client';
import {getToken} from '../../storageControllers'

const sendReportController = async (session:Object, address : Object,images : Array<Object> = null,description: String) => {
    
    
    try {

        let token = await getToken();
        const data = new FormData();

        await Promise.all(
            images.map((image) => {
                data.append('files',{
                    name: image.path.split('/').pop(),
                    type: image.mime,
                    uri: Platform.OS === 'android' ? image.path : image.path.replace('file://', '')
                })
            
            })

        )

        data.append('user',JSON.stringify(session));
        data.append("address",JSON.stringify(address));
        data.append("description",description);


        const controller = new AbortController();
        
        let res = null;
        setTimeout(() => {
            if (!res) {
                    
                controller.abort()

            }
        }, 5000)

        const config = {
            signal: controller.signal,
            timeout: 5000,
            headers : {

                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"

            }

        }


        res = await client.post("/report/send",data,config)
        return res.data;
        
    } catch (err) {

        
        if(err.message == 'canceled')
            throw new Error('req_error_01')

        throw err;
        
    }


}

module.exports = sendReportController;