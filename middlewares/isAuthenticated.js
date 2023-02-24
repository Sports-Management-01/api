const {verifyToken} = require('../services/tokenService')

const isAuthenticated = async(req,res,next)=>{
    const auth = req?.headers?.authorization
    if(!auth){
        res.status(401)
        return res.send({
            success:false,
            messages:['Please provide a valid auth header']
        })
    }
    const token = auth.split(' ')
    const user = await verifyToken(token[token.length-1])
    console.log(user)
    if(user){
        req.user = user
        return next()
    }
    res.status(401)
    return res.send({
        success:false,
        messages:['You are not allowed to do so!']
    })
}

module.exports = {
    isAuthenticated
}