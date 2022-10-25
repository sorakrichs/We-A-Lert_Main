import client from '../../client';

const userUpdateLocationController = async (uid:String ,userLocation) => {

    
    const data = {

        uid : uid,
        location: userLocation
    }
    
    let res = await client.post("/user/location",data, {

        headers: { 
            "Content-Type": "application/json"
        }

    }).then((r) => r).catch((err) => {throw err;});
    
    return res;


}

module.exports = userUpdateLocationController