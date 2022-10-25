import client from '../../client';

const getMemberAddressController = async (id: String) => {
    

    if(typeof id != 'string') {throw new Error('getMemberAddress: id must be String') }
    else {
        
        let res = await client.get("/member/address/"+id, {
            timeout: 1000,
            headers: { 
                "Content-Type": "application/json"
            }

        }).then((r) => r).catch((err) => {throw err;});
        

        return res.data;
    }

}

module.exports = getMemberAddressController;