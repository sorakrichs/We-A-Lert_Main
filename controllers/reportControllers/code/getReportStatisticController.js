import client from '../../client';

const getReportStatisticController = async () => {
    
    
    try {



        let res = await client.get("/report/statistic", {
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

module.exports = getReportStatisticController;