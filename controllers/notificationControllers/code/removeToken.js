import client from '../../client';
import {getToken} from '../../storageControllers'

const removeToken = async (id:String,role:String) => {

   try {
      
      const controller = new AbortController();
      let res = null;
      setTimeout(() => {
         if (!res) {
            
            controller.abort()
         }
      }, 5000)
   
      
      let token = await getToken();
      res = await client.post("/member/logout/"+id,{
         role: role
      },{
         signal: controller.signal,
         timeout: 5000,
         headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
         }

      }).then((r) => r);

      return res;


   } catch (err) {

      if(err.message == 'canceled')
         throw new Error('req_error_01')

      throw err
   }

}  

module.exports = removeToken