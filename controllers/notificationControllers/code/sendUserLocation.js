import client from '../../client';

const sendUserLocation = async (id,location) => {

   if(!id || !location) return;

   try {

      const controller = new AbortController();
        
        let res_data = null;
        setTimeout(() => {
            if (!res_data) {
                    
                controller.abort()

            }
        }, 5000)

      res_data = await client.post(`/member/location/${id}`,{location: location}, {

         signal: controller.signal,
         timeout: 5000,
         headers: { 

            "Content-Type": "application/json"
         }

      })
      
   } catch (err) {

      throw err
   }

}  

module.exports = sendUserLocation