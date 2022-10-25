const organizationRegisterController = async (data : {
        user : {
            username:String,
            password:String,
            name:String,
            surname:String,
            role:'member',
            email:String,
            personalId:String,
            phone:String,
            address: Array<Object>
        },
        volunteer : {
            teamrole : 'leader'
        },
        organization : {
            name: String,
            address: Object
        }
        
    }) => {
    

    if(typeof data != 'object') {throw new Error('organizationRegisterController: data must be Object') }
    else if(typeof data.user.username != 'string') {throw new Error('organizationRegisterController: user.username must be String') }
    else if(typeof data.user.password != 'string') {throw new Error('organizationRegisterController: user.password must be String') }
    else if(typeof data.user.name != 'string') {throw new Error('organizationRegisterController: user.name must be String') }
    else if(typeof data.user.surname != 'string') {throw new Error('organizationRegisterController: user.surname must be String') }
    else if(typeof data.user.email != 'string') {throw new Error('organizationRegisterController: user.email must be String') }
    else if(typeof data.user.personalId != 'string') {throw new Error('organizationRegisterController: user.personalId must be String') }
    else if(typeof data.user.phone != 'string') {throw new Error('organizationRegisterController: user.phone must be String') }
    else if(typeof data.user.address != "object" && !data.user.address) {throw new Error('organizationRegisterController: user.phone must be String') }
    else if(typeof data.volunteer.teamrole != 'string') {throw new Error('organizationRegisterController: volunteer.teamrole must be String') }
    else if(typeof data.organization.name != 'string') {throw new Error('organizationRegisterController: organization.name must be String') }
    else {
        
        let res = await client.post("/volunteer/register",data, {
            headers: { 
                "Content-Type": "application/json"
            }

        }).then((r) => r).catch((err) => {throw err;});
        
        return res;
    }

}

module.exports = organizationRegisterController;