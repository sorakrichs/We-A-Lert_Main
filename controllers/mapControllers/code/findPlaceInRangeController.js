import client from '../../client';

const findPlaceInRangeController = async (location : {
    lat: Number,
    lon: Number
},tag: String) => {

    const uri = 'https://search.longdo.com/mapsearch/json/search';
    try {
        if(typeof location != 'object') {throw new Error ('findPlaceInRangeController: data must be object')}
        else if(typeof location.lat != 'number' || typeof location.lon != 'number') {throw new Error ('findPlaceInRangeController: lat,lon must be number')}
        else if (location.lat > 90 || location.lat < -90){throw new Error ('findPlaceInRangeController: lat must be in range {-90,90}') }
        else if (location.lon > 180 || location.lon < -180){throw new Error ('findPlaceInRangeController: lon must be in range {-180,180}') }
        else {
            



            return await client.get(uri,{
                params: {
                    
                    key: "0ba75287512b12f50f558308fb6c720c",
                    lon: location.lon,
                    lat: location.lat,
                    tag: tag,
                    limit: 100,
                    span: "5km"

                }}).then((r) => {return r.data})

            

        }
    } catch (err) {
        throw err;
    }


}

module.exports = findPlaceInRangeController;