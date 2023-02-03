const models = require('../models');
const {Sequelize} = require("sequelize");

// const { use } = require('../routes/users');

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
    const { password, passwordConfirmation } = req.body;
    if (password != passwordConfirmation){
      result.success = false
    result.messages.push('Password does not match!')
    return res.send(result);
    }
    //To check if account type is company or not
 const userRole = await models.Role.findOne({where:{id:req?.body?.roleId}});
 
    
    const [user, created] = await models.User.findOrCreate({
        where: { email: req.body.email },
        defaults: {
          name: req.body.name,
          email: req.body.email,
          password: hashPassword(req?.body?.password),
          phone: req?.body?.phone,
          roleId: req?.body?.roleId,
          image: req?.file?.filename,
          approvedAt: userRole.required?null:Sequelize.fn('now')
          
        }
      });

       
      console.log(user)
      if(created){
        result.data = userTransformer(user)
        result.messages.push('User created successfully...')
        
      }else{
        res.status(409)
        result.success = false;
        result.messages.push("User already exists!");
      }
      return res.send(result)
};

//LOGIN
const login = async (req, res, next) => {
  const result = {
    success: true,
    data: null,
    messages: [],
  };
  const { email = "", password = "" } = req.body;
  const user = await models.User.findOne({ where: { email } });
  if (user) {
    if(user.approvedAt == null){
      result.success = false,
      result.messages.push("Your account does not activate yet!!!!")
      res.status(401);
    }
    if (verifyPassword(password, user.password)) {
      result.data = userTransformer(user);
      result.messages.push("Loggen in successfully");
      result.token = getToken({
        id: user.id,
        roleId: user.roleId,
      });
    } else {
      result.success = false;
      result.messages.push("Invalid password!");
      res.status(401);
    }
  } else {
    result.success = false;
    result.messages.push("Account not found you should register first!");
    res.status(401);
  }
  return res.send(result);
};
//END LOGIN

//Get All users
const index = async(req,res,next)=>{
  const result= {
    success: true,
    data:null,
    messages:[],
  };
  const users = await models.User.findAll();
  result.data =   userTransformers(users);
  console.log(result.data);
  return res.send(result);
};
// END Get All users

//Get My profile
const show = async(req,res,next)=>{
const result = {
  success:true,
  data:null,
  messages: [],
};
const user = await getInstanceById(req.params.id,"User");
if(user.success){
  result.data = userTransformer(user.instance.dataValues);
}
result.success = false;
result.messages = [...user.messages];
res.status(user.status);
return res.send(result);
}
//END Get my profile

//Update my profile
const update = async (req,res,next) =>{
  const result = {
    success: true,
    data:null,
    messages:[]
  };
 const name = req.body.name
   const   email = req.body.email
    const  password = hashPassword(req.body.password)
    const  phone = req.body.phone
  const user = await getInstanceById(req.params.id,"User");
  if(user.success){
    const newData = {
      name,
      email,
      password,
      phone
    };
    if (req.file) {
      newData.image = req.file.filename;
    }
     await user.instance.update( newData);
     result.data = userTransformer(user.instance);
     result.messages.push("User updated successfully...");
  }else{
    result.messages = [...user.messages];
    res.status(user.status);
  }
  return res.send(result)
}
//END

//Delete user
const destroy = async (req, res, next) => {
  const result = {
    success: true,
    data: null,
    messages: [],
  };
  const user = await getInstanceById(req.params.id, "User");
  if (user.success) {
    await user.instance.destroy();
    result.messages.push("User deleted successfully");
  } else {
    res.status(user.status);
    result.success = false;
    result.messages = [...user.messages];
  }
  return res.send(result);
};
//END delete user
module.exports = {
    store,
    login,
    index,
    show,
    update,
    destroy
}