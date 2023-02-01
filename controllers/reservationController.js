const models = require('../models');
const { getInstanceById } = require('../services/modelService');
const { Op } = require('sequelize');
const { sequelize } = require('../models');
const store = async (req,res,next)=>{
  const user = await models.User.findByPk(req.user.id)
  const {fieldId, from, to, total } = req.body
  const field = await getInstanceById(fieldId, "Field")
  console.log(field)
  if(field.success)
  {const [reservation, created]= await models.Reservation.findOrCreate({
      where: {
        userId: req.user.id,
        fieldId,
        from,
        to, 
      },
      defaults: {
        total
      }
    })
    if(created){
      if (Array.isArray(req.body.equipments)) {
        req.body.equipments.forEach(async (eq) => {
          const [equipments, created] = await models.ReservationEquipment.findOrCreate ({
            where: {
              reservationId: reservation.id,
              equipmentId: eq.id

            },
            defaults:{
              count: eq.count
            }
          })}) 
        }
      
      return res.send({
        success: true,
        messages: ['Reservation created successfuly']
      })
    }else {
      return res.send({
        success: false,
        messages: ['You have already created a reservation to this field']
      })
    }
  }
  return res.send({
    success: false,
    messages: ['The field you are trying to add is invalid']
  })
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
    // const field = await getInstanceById(req.body.fieldId, "Field")
    // const user = await models.User.findByPk(req.user.id)
    const { from, to, total } = req.body
    // if (!field.success) {
    //     item.status = 422;
    //     result.messages.push("Please enter a valid field id");
    //   } else if (!user.success) {
    //     item.status = 422;
    //     result.messages.push("Please enter a valid user id");
    //   }
      const item = await getInstanceById(req.params.id, "Reservation");
      if(item.success){
       
        await models.ReservationEquipment.destroy({ where: { reservationId: [item.instance.id] }})
        if (Array.isArray(req.body.equipments)) {
          req.body.equipments.forEach(async (eq) => {
            const [equipments, created] = await models.ReservationEquipment.findOrCreate ({
              where: {
                reservationId: item.instance.id,
                equipmentId: eq.id
  
              },
              defaults:{
                count: eq.count
              }
            })}) 
          }
        result.data = item.instance
        result.messages.push('Reservation updated successfully')
        return res.send(result)
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
    const destroy = async(req,res,next)=>{
      const result = {
        success: true,
        data: null,
        messages: []
    }
    const item = await getInstanceById(req.params.id, "Reservation");
    if(item.success){
        await item.instance.destroy();
        result.messages.push('Reservation deleted successfully');
    } else {
        res.status(item.status);
        result.success = false;
        result.messages = [...item.messages];
      }
      return res.send(result);
    }
// const reservationEquipment = async(req,res)=>{
//     const equipment = await getInstanceById(req.body.equipmentId, "Equipment");
//     const reservation = await getInstanceById(req.body.reservationId, "Reservation");
//     const {count} = req.body
//     try{
//       if (equipment.success) {
//         const equAdded = await reservation.instance.addEquipment(req.body.equipmentId);
        
//         if (equAdded) {
//           return res.send({
//             success: true,
//             messages: ["Equipment has been added to the reservation list"],
//           });
//         } else {
//           return res.send({
//             success: false,
//             messages: ["Could not add the equipment"],
//           });
//         }
//       }
//       return res.send({
//         success: false,
//         messages: "Errors invalid equipment Id",
//       });

//     }catch(error){
//       console.log(error)
//       return new Error(error)
//     }
//   };

module.exports = {
    store,
    index,
    update,
    show,
    destroy
    // reservationEquipment

}
