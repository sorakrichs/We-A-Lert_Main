import client from '../../client';

const getUserReportStatisticController = async (id='') => {
    
    
    try {



        let res = await client.get("/report/statistic/"+id, {
            timeout: 5000,
            headers: { 
                "Content-Type": "application/json"
            }

        }).then((r) => r).catch((err) => {throw err;});

        return res.data;
       
        
    } catch (err) {

        throw err;
        
    }


}

module.exports = getUserReportStatisticController;