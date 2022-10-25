import client from '../../client';
import {getToken} from '../../storageControllers'

const getReportController = async (id='') => {
    
    
    try {

        let token = await getToken();
        let res = await client.get('/report/data/'+id, {
            timeout: 5000,
            headers: { 
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }

        }).then((r) => r).catch((err) => { throw err;});

        return res.data;
       
        
    } catch (err) {
        
        throw err;
        
    }


}

module.exports = getReportController;