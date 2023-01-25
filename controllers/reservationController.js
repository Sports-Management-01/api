const models = require('../models');
const { getInstanceById } = require('../services/modelService');

const store = async (req,res,next)=>{
    const result = {
        success: true,
        date: null,
        messages: []
    }
    const field = await getInstanceById(req.body.fieldId, "Field")
    const user = await getInstanceById(req.body.userId, "User")
    const {from = ""} = req.body
    const {to = ""}= req.body
    const {total = ""} = req.body
    
    if(!field.success){
        result.success=false,
        res.status(422);
        result.messages.push("Please enter a valid fiedl id");
      }
      if(!user.success){
        result.success=false,
        res.status(422);
        result.messages.push("Please enter a valid user id");
      }
      if (!result.success) {
        return res.send(result);
      }
      const [reservation, created] = await models.Reservation.findOrCreate({
        fieldId : req.body.fieldId,
        userId : req.body.userId,
        from,
        to,
        total
      });
      if(created){
        result.data = reservation
        result.messages.push('Reservation Created Successfully')
      }else {
        res.status(200);
        result.success = false;
        result.messages.push("You are already reserved");
      }
      return res.send(result);
}
const index = async (req,res,next)=>{
    const result = {
        success: true,
        data: null,
        messages: []
    }
    const reservations = await models.Reservation.findAll({

    })
    result.data=reservations
    return res.send(result)
}
const update = async (req, res, next) => {
    const result = {
      success: true,
      data: null,
      messages: [],
    };
    const field = await getInstanceById(req.body.fieldId, "Field")
    const user = await getInstanceById(req.body.userId, "User")
    const {from = ""} = req.body
    const {to = ""}= req.body
    const {total = ""} = req.body
    if (!field.success) {
        item.status = 422;
        result.messages.push("Please enter a valid field id");
      } else if (!user.success) {
        item.status = 422;
        result.messages.push("Please enter a valid user id");
      }
      const item = await getInstanceById(req.params.id, "Reservation");
      if(item.success){
        await item.instance.update({
            fieldId : req.body.fieldId,
            userId : req.body.userId,
            from,
            to,
            total
        });
        result.data = item.instance
        result.messages.push('Reservation updated successfully')
      } else {
        result.messages = [...item.messages];
        res.status(item.status);
      }};
      const show = async (req, res, next) => {
        const result = {
          success: false,
          data: null,
          messages: [],
        };
const item = await getInstanceById (req.params.id, "Reservation");
if (item.success){
    result.success= true
    result.data= item.instance.dataValues
}
result.messages = [...item.messages]
    res.status(item.status)
    return res.send(result)

    }

module.exports = {
    store,
    index,
    update,
    show

}
