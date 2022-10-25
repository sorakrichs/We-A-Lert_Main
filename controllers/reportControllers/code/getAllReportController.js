import client from '../../client';

const getAllReportController = async () => {
    
    
    try {

        const controller = new AbortController();
        let res = null;

        setTimeout(() => {
            if (!res) {
                
                controller.abort()
            }
        }, 20000)

        res = await client.get("/report/get", {
            signal: controller.signal,
            timeout: 10000,
            headers: { 
                "Content-Type": "application/json"
            }

        }).then((r) => r).catch((err) => {throw err;});

        return res.data;

    } catch (err) {
        if(err.message == 'canceled') {
            throw new Error('req_error_01')
        }

        throw err;
        
    }


}

module.exports = getAllReportController;