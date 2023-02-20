const models = require('../models');

const {getInstanceById} = require('../services/modelService');

//Create ROLE
const store = async (req,res,next)=>{
    const result = {
        success: true,
        data: null,
        messages:[]
    };
    const [role, created] = await models.Role.findOrCreate({
        where: { name: req.body.name },
        defaults: {
          required: req.body.required,
        }
      });
      console.log(role)
      if(created){
        result.messages.push('Role created successfully...')
      }else{
        res.status(409)
        result.success = true;
        result.messages.push("Role created successfully");
      }
      return res.send(result)
};
//END Create Role

//Update ROLE 
const update = async (req,res,next) =>{
    const result = {
      success: true,
      data:null,
      messages:[]
    };
    const role = await getInstanceById(req.params.id,"Role");
    if(role.success){
       await role.instance.update({
        name: req.body.name,
        required: req.body.required
       });
       result.messages.push("Role updated successfully...");
    }else{
      result.messages = [...role.messages];
      res.status(role.status);
    }
    return res.send(result)
  }
  //END
//END Update Role

//Delete Role
const destroy = async (req, res, next) => {
  const result = {
    success: true,
    data: null,
    messages: [],
  };
  const role = await getInstanceById(req.params.id, "Role");
  if (role.success) {
    await role.instance.destroy();
    result.messages.push("Role deleted successfully");
  } else {
    res.status(role.status);
    result.success = false;
    result.messages = [...role.messages];
  }
  return res.send(result);
};
//END delete Role

//Get All Roles
const index = async(req,res,next)=>{
  const result= {
    success: true,
    data:null,
    messages:[],
  };
  const roles = await models.Role.findAll();
  result.data =  roles
  console.log(roles);
  return res.send(result);
};
// END Get All Roles

//Get My Role
const show = async(req,res,next)=>{
  const result = {
    success:true,
    data:null,
    messages: [],
  };
  const role = await getInstanceById(req.params.id,"Role");
  if(role.success){
    result.success= true,
    result.messages= [... role.messages]
    result.data = role.instance;
  return res.send(result);

  }
  result.success = false;
  result.messages = [...role.messages];
  res.status(role.status);
  return res.send(result);
  }
  //END Get my Role
module.exports = {
    store,
update,
destroy,
index,
show
}