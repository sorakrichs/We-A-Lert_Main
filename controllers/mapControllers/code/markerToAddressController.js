import client from '../../client';

const markerToAddressController = async (data : {
    lat: Number,
    lon: Number
}) => {

    const uri = 'https://api.longdo.com/map/services/address';
    try {
        if(typeof data != 'object') {throw new Error ('markerToAddressController: data must be object')}
        else if(typeof data.lat != 'number' || typeof data.lon != 'number') {throw new Error ('markerToAddressController: lat,lon must be number')}
        else if (data.lat > 90 || data.lat < -90){throw new Error ('markerToAddressController: lat must be in range {-90,90}') }
        else if (data.lon > 180 || data.lon < -180){throw new Error ('markerToAddressController: lon must be in range {-180,180}') }
        else {


            const address = await client.get(uri,{
                params: {
                    key: "0ba75287512b12f50f558308fb6c720c",
                    lon: data.lon,
                    lat: data.lat
                }}).then((r) => r.data)
            
            return address;

        }
    } catch (err) {
        throw err;
    }


}

module.exports = markerToAddressController;