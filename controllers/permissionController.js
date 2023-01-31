
const models = require('../models');
const { getInstanceById } = require('../services/modelService');

const store = async (req,res,next)=>{
    const result = {
        success: true,
        data: null,
        messages: [],
      };
      
      const [permission, created] = await models.Permission.findOrCreate({
        
        where: {
            permission: req.body.permission,
            roleId: req.body.roleId,
        },
        defaults: {
       
         
         allowed: req.body.allowed
        } 
     });
     if(created){
        result.data= permission,
        result.messages.push('Permission created successfully')
    }else{
        res.status(409);
        result.success = false,
        result.messages.push('Permission already available')
    }
    return res.send(result)
}
const index = async (req,res,next)=>{
    const result = {
        success: true,
        data: null,
        messages: []
    }

    const permissions = await models.Permission.findAll()
    if (permissions){
        result.data= permissions;
        result.messages.push("You have all permissions");
    }else {
        res.status(422)
        result.success=false;
        result.messages.push()
    }
    return res.send(result)
}
const show = async (req,res,next)=>{
    const result= {
        success: true,
        data: null,
        messages: []
    }
    const item = await getInstanceById(req.params.id, "Persmission");
    if(item.success){
        result.success = true,
        result.data = item.instance.dataValues
    }
    result.messages = [...item.messages];
    res.status(item.status);
    return res.send(result);
}
const update = async (req,res,next)=>{
    const result = {
        success: true,
        data: null,
        messages: []
    }
    const item = await getInstanceById(req.params.id, "Permission");
    if(item.success){
    
    await item.instance.update({
        permission: req.body.permission,
         roleId: req.body.roleId,
         allowed: req.body.allowed
    });
    result.data= item.instance
    result.messages.push('Permission updated successfully');
}else {result.messages = [...item.messages];
res.status(item.status);
}
return res.send(result);
}
const destroy = async (req,res,next)=> {
    const result = {
        success: true,
        data: null,
        messages: []
    }
    const item = await getInstanceById(req.params.id, "Permission");
    if(item.success){
        await item.instance.destroy();
        result.messages.push('permission deleted successfully');
    } else {
        res.status(item.status);
        result.success = false;
        result.messages = [...item.messages];
      }
      return res.send(result);
}

module.exports = {
    store,
    index,
    show,
    update,
    destroy

}