import client from '../../client';
import {getToken} from '../../storageControllers'

const updateStatusController = async (report_id: String,status: String) => {
    
    
    try {

        let token = await getToken();
        data = {
            status: status
        }

        const config = {
            timeout: 1000,
            headers : {

                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"

            }

        }


        await client.patch(`/report/status/${report_id}`,data,config
        ).then((res) => {
            
            return res;
            
        })
        
    } catch (err) {

        throw err;
        
    }


}

module.exports = updateStatusController;