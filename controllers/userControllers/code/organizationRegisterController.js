import client from '../../client';
import {sessionStorage} from '../../storageControllers'

const organizationRegisterController = async (
    members : [{
        username:String,
        password:String,
        name:String,
        surname:String,
        role:'volunteer',
        teamrole:String,
        email:String,
        personalid:String,
        phone:String,
        address: Array<Object>,
        image:Object,
        uuid:String
    }],
    organization : {

        name: String,
        branchname: String,
        phone: Array<String>,
        description: String,
        address: Object

    }) => {

        try {
        const regex = /(?:\.([^.]+))?$/;
        const data = new FormData();
        await Promise.all(

            members.map((member) => {
 
                if(member?.image) {
                    data.append('files',{
                        name: member?.uuid + '.' + regex.exec(member?.image.path)[1],
                        type: member?.image.mime,
                        uri: Platform.OS === 'android' ? member?.image?.path : member?.image?.path.replace('file://', '')
                    })
                }
            
            })

        )

        data.append('members',JSON.stringify(members));
        data.append('organization',JSON.stringify(organization));
        const config = {
            timeout: 1000,
            headers : {

                "Content-Type": "multipart/form-data"

            }

        }


        await client.post("/volunteer/register",data,config)
        .then((res) => {
            
            return res;
            
        })

    } catch(err) {

        throw err;


    }
    
    
}

    

module.exports = organizationRegisterController;