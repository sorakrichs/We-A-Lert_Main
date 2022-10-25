const sendSmsVerification = async (phoneNumber) => {
    try {
        const data = JSON.stringify({
            to: phoneNumber,
            channel: "sms",
        });
        
        let res = await fetch("https://verify-7123-egm1qz.twil.io/start-verify", {
            method: "POST",
            timeout: 5000,
            headers: { 
                "Content-Type": "application/json"
            },
            body: data,

        }).then((r) => r).catch((err) => {throw err;});

   
        const json = await res.json();
        return json.success

    } catch (err) {

      throw err

    }
};

module.exports = sendSmsVerification;
