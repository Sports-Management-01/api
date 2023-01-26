const models = require('../models');
const { getInstanceById } = require('../services/modelService');


const store = async(req,res,next)=>{
const result = {
    success: true,
    data: null,
    messages: []
}
const country = await getInstanceById(req.body.countryId, "Country")
console.log(country)
if(country.success){
    
    const [state, created] = await models.State.findOrCreate({
        where: {
         name: req.body.name
        },
        defaults: {
         countryId: req.body.countryId
        }
     });
     
    if(created){
        result.data= state,
        result.messages.push('State created successfully')
    }else{
        res.status(409);
        result.success = false,
        result.messages.push('State already available')
    }
    return res.send(result)
    }else {
        res.status(409);
        result.success = false,
        result.messages.push('The country Id not found')
    }
return res.send(result)
}


const index = async (req,res,next)=>{
    const result = {
        success: true,
        data: null,
        messages: []
    }

    const states = await models.State.findAll()
    if (states){
        result.data= states;
        result.messages.push("You have all states");
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
        const item = await getInstanceById(req.params.id, "State");
        if(item.success){
            result.success = true,
            result.data = item.instance.dataValues
        }
        result.messages = [...item.messages];
        res.status(item.status);
        return res.send(result);
    }



module.exports = {
    store,
    index,
    show

}
