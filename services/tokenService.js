const jwt = require('jsonwebtoken');

const getToken = (data)=>{
return jwt.sign(
{
    ...data,
},
process.env.secretKey,
{
    expiresIn:60*60*24,
}
);
}

verifyToken = (token) =>{
let result = null
try {
    const payload = jwt.verifyToken()
    
} catch (error) {
    
}
}


module.exports = {
    getToken,

}