import client from '../../client';
import {getToken} from '../../storageControllers'

const validateReportContoller = async (
    session: {
        userid: String,
        username: String,
        phone: String
    },
    report_id: String,
    reportUser: Object,
    reportdata : Object,
    location : Object,
    type: String,
    subtype: String,
    images : Array<Object> = null,
    description: String) => {
    
    
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
        );

        data.append('report_id',report_id);
        data.append('user',JSON.stringify(session));
        data.append('report_user',JSON.stringify(reportUser));
        data.append('location',JSON.stringify(location));
        data.append('type',type);
        data.append('subtype',subtype);
        data.append('reportdata',JSON.stringify(reportdata))
        data.append("description",description);
        
        const config = {
            timeout: 1000,
            headers : {

                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"

            }

        }

        await client.post("/report/validate",data,config
        ).then((res) => {
            
            return res;
            
        })
        
    } catch (err) {

        throw err;
        
    }


}

module.exports = validateReportContoller;