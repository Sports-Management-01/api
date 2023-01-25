const isAuthenticated = require('./isAuthenticated')

const hasUser = (req,res,next)=>{
    const auth = req?.headers?.athorization
    if(auth){
        isAuthenticated(req,res,next)
        return
    }
    //Guest
    req.user = {type:'guest'}
    return next()
}

module.exports = {hasUser}