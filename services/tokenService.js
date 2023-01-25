const jwt = require('jsonwebtoken');

const getToken = (data)=>{
return jwt.sign(
{
    ...data,
},
process.env.secretKey,
{
    expiresIn:60*60*24*7,
}
);
};

verifyToken = (token) =>{
let result = null
try {
    const payload = jwt.verify(token, process.env.secretkey);
    if(payload){
        result = payload
    }
} catch (error) {
   result = error 
}
};


module.exports = {
    getToken,
    verifyToken
}