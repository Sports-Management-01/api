const models = require('../models');
const { getInstanceById } = require('../services/modelService');


const store = async(req,res,next)=>{
const result = {
    success: true,
    data: null,
    messages: []
}
const [equipment, created] = await models.Equipment.findOrCreate({
   where: {
    name: req.body.name
   },
   defaults: {
    price: req.body.price,
    multiple: req.body.multiple
   }
});
if(created){
    result.success = true
    result.data= equipment,
    result.messages.push('Equipment created successfully')
}else{
    res.status(409);
    result.success = false,
    result.messages.push('Equipment already available')
}
return res.send(result)

}
const index = async (req,res,next)=>{
    const result = {
        success: true,
        data: null,
        messages: []
    }

    const equipments = await models.Equipment.findAll()
    if (equipments){
        result.data= equipments;
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
        const item = await getInstanceById(req.params.id, "Equipment");
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
        const item = await getInstanceById(req.params.id, "Equipment");
        if(item.success){
          if (item.instance.name != req.body.name) {
            const newNameAlreadyUsed = await models.Equipment.findOne({
                where: {name: req.body.name}
            })
            if(newNameAlreadyUsed){
                return res.send("new name is already token")
            }
            console.log(item.instance.name)
          }
        await item.instance.update({
            name: req.body.name,
            price: req.body.price,
            multiple: req.body.multiple
        });
        result.data= item.instance
        result.messages.push('Equipment updated successfully');
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
        const item = await getInstanceById(req.params.id, "Equipment");
        if(item.success){
            await item.instance.destroy();
            result.messages.push('Equipment deleted successfully');
        } else {
            res.status(item.status);
            result.success = false;
            result.messages = [...item.messages];
          }
          return res.send(result);
    };


module.exports={
    store,
    index,
    show,
    update,
    destroy
}