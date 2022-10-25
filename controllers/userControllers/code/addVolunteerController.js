import client from '../../client';
import {getToken} from '../../storageControllers'

const addVolunteerController = async (
    id: String , 
    member: Object
    ) => {

    try {

        let token = await getToken();
        const data = new FormData();
        if(member?.image) {
            data.append('files',{
                name: member?.image.path.split('/').pop(),
                type: member?.image.mime,
                uri: Platform.OS === 'android' ? member?.image.path : member?.image.path.replace('file://', '')
            })
        }

        data.append('member',JSON.stringify(member));
        const config = {
            timeout: 5000,
            headers : {
                
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"

            }

        }


        await client.post("/volunteer/addStaff/" + id,data,config)
        .then((res) => {
            
            return res;
            
        })

    } catch(err) {

        throw err;


    }
    
    
}

    

module.exports = addVolunteerController