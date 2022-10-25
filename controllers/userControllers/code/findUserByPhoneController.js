import client from '../../client';

const findUserByPhoneController = async (phone: String) => {
    

    if(typeof phone != 'string') {throw new Error('findUserByPhoneController: phone must be String') }
    else {
        
        let res = await client.get("/member/phone/"+phone, {
            timeout: 1000,
            headers: { 
                "Content-Type": "application/json"
            }

        }).then((r) => r).catch((err) => {throw err;});
        

        return res.data;
    }

}

module.exports = findUserByPhoneController;