import client from '../../client';


const getEarthquakeFormAPIController = async () => {

    let today = new Date()
    let yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate()-5)

    let res = await client.get(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${yesterday.toISOString().split('T')[0]}&endtime=${today.toISOString().split('T')[0]}&latitude=13.736717&longitude=100.523186&maxradiuskm=3000`, {

      timeout: 500,
      headers: { 

          "Content-Type": "application/json"
      }

   }).then((r) => r).catch((err) => { throw err; });

   return res.data.features;

}  

module.exports = getEarthquakeFormAPIController