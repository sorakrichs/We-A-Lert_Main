const checkVerification = async (phoneNumber, code) => {
    try {
      const data = JSON.stringify({
        to: phoneNumber,
        code: code,
      });
      
      const response = await fetch(`https://verify-7123-egm1qz.twil.io/check-verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });
   
      const json = await response.json();
      return json.success;
    } catch (error) {
      console.error(error);
      return false;
    }
};

module.exports = checkVerification;