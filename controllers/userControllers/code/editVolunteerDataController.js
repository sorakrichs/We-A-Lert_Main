import client from '../../client';

const editVolunteerDataController = async (id: String,data:Object) => {
    
    if(typeof id != 'string') {throw new Error('editVolunteerDataController: data must be String') }
    else if(typeof data != 'object') {throw new Error('editVolunteerDataController: data must be Object') }
    else if(typeof data.username != 'string') {throw new Error('editVolunteerDataController: data.username must be String') }
    else if(typeof data.name != 'string') {throw new Error('editVolunteerDataController: data.name must be String') }
    else if(typeof data.surname != 'string') {throw new Error('editVolunteerDataController: data.surname must be String') }
    else if(typeof data.email != 'string' && data.email != null) {throw new Error('editVolunteerDataController: data.email must be String or Null') }
    else if(typeof data.personalid != 'string') {throw new Error('editUserDataController: data.personalId must be String') }
    else if(typeof data.phone != 'string') {throw new Error('editVolunteerDataController: data.phone must be String') }
    else if(typeof data.teamrole != 'string') {throw new Error('editVolunteerDataController: data.phone must be String') }
    else {

        let res = await client.post("/volunteer/edit/"+id,data, {
            timeout:5000,
            headers: { 
                "Content-Type": "application/json"
            }

        }).then((r) => r).catch((err) => {throw err;});

        return res;
        
    }

}

module.exports = editVolunteerDataController;