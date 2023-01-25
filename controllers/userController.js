const models = require('../models')
const{getInstanceById} = require('../services/modelService');
const {hashPassword, verifyPassword} = require('../services/passwordService')
const {getToken, verifyToken} = require('../services/tokenService')
const {userTransformer,userTransformers} = require('../transformer/userTransformer')

const store = async (req,res,next)=>{
    const result = {
        success: true,
        data: null,
        messages:[]
    };
    const [user, created] = await models.User.findOrCreate({
        where: { email: req.body.email },
        defaults: {
          name: req.body.name,
          email: req.body.email,
          password: hashPassword(req?.body?.password),
          phone: req?.body?.phone,
          roleId: req?.body?.roleId,
          image: req?.file?.image,
          
        }
      });
      console.log(user)
      if(created){
        result.data = userTransformer(user)
        result.messages.push('User created successfully...')
      }else{
        res.status(409)
        result.success = true;
        result.messages.push("User created successfully");
      }
      return res.send(result)
};

module.exports = {
    store
}