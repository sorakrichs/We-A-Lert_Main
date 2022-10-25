import client from '../../client';
import {getToken} from '../../storageControllers'

const sendReportController = async (userid : String,location : Array<Number>,images : Array<Object> = null) => {
    
    
    try {
        const payload = {
            "userid": userid,
            "location": {
                "type": "Point",
                "coordinates" : [location.lon,location.lat]
            },
            "images": images

        }

        let token = await getToken();
    
        const config = {

            headers : {

                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"

            }

        }


        await client.post("/report",payload,config)
        
    } catch (err) {

        throw err;
        
    }


}

module.exports = sendReportController;