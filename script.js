const axios = require('axios');

const url = "localhost:3000";

(async () => {

    const {data}  = await axios.post("http://localhost:3000/auth/login", {
         username:"mohammedla",
         password: "1234"
    });


    const { access_token } = data;

    console.log(access_token);
    
    const config = {
        headers: { Authorization: `Bearer ${access_token}` }
    };
    

    await axios.post("http://localhost:3000/users/test" , null ,config); 
    

})();