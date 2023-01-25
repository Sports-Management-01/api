const models = require('../models');
const { getInstanceById } = require('../services/modelService');



const store = async (req,res,next)=>{
    const result = {
        success: true,
        data: null,
        messages: []
    }
    const [country,created] = await models.Country.findOrCreate({
        where:{
        name: req.body.name
        }
    })
    if (created){
        result.data= country,
        result.messages.push('Country created successfully')
    }else{
        res.status(409);
        result.success = false,
        result.messages.push('Country already available')
    }
    return res.send(result)
};
const index = async (req,res,next)=>{
const result = {
    success: true,
    data: null,
    messages: []
}
const countries = await models.Country.findAll()
if (countries){
    result.data= countries;
    result.messages.push("You have all countries");
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
    const item = await getInstanceById(req.params.id, "Country");
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
    const item = await getInstanceById(req.params.id, "Country");
    if(item.success){
    await item.instance.update({
        name: req.body.name,
    });
    result.data= item.instance
    result.messages.push('Country updated successfully');
}else {result.messages = [...item.messages];
res.status(item.status);
}
return res.send(result);

}
const destroy = async (req,res,next)=>{
    const result = {
        success: true,
        data: null,
        messages: []
    }
    const item = await getInstanceById(req.params.id, "Country");
    if(item.success){
        await item.instance.destroy();
        result.messages.push('Country deleted successfully');
    } else {
        res.status(item.status);
        result.success = false;
        result.messages = [...item.messages];
      }
      return res.send(result);
};
module.exports = {
    store,
    index,
    show,
    update,
    destroy

}