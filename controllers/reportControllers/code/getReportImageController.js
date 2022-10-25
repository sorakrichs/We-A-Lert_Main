import client from '../../client';
import {getToken} from '../../storageControllers'

const getReportImageController = async (data) => {
    
    
    try {

        if(typeof data != 'object') {throw new Error('memberLogin: data must be Object') }
        else {
            
            let res_data = await client.post("/report/images",data, {
                timeout: 5000,
                headers: { 
                    "Content-Type": "application/json"
                }

            }).then((r) => r).catch((err) => {throw err;});


            return res_data;
        }
        
    } catch (err) {

        throw err;
        
    }


}

module.exports = getReportImageController;