import client from '../../client';

const sendToken = async (data) => {


   try {

      let res_data = await client.post("/member/setFCMToken",data, {

         timeout: 5000,
         headers: { 

            "Content-Type": "application/json"
         }

      })

   } catch(err) {

      throw err;
   }

}  

module.exports = sendToken