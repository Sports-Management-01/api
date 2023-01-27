const models = require('../models');
const { getInstanceById } = require('../services/modelService');

const store = async (req,res,next) => {
    const result = {
        success: true,
        data: null,
        messages: [],
      };
      const payment = await models.Payment.create({
        reservationId: req.body.reservationId,
        amount: req.body.amount,
        paymentWay: req.body.paymentWay,
        dateTime: req.body.dateTime,
        paymentInfo: req.body.paymentInfo

      })
      if(payment){
        result.data=payment,
        result.messages.push('Your Payment has been created successfuly')
      }else{
        result.data = false,
        result.messages.push('Please try a gain')
      }
      return res.send(result)

}
const index = async (req,res,next)=>{
    const result = {
        success: true,
        data: null,
        messages: [],
      };
      const payments = await models.Payment.findAll({
      })
      if(payments){
        result.data = payments,
        result.messages.push('You have all payments')
      }else {
        result.messages = [...item.messages];
      res.status(item.status);
      }
      return res.send(result)

}
const show = async (req,res,next)=>{
    result = {
        success: true,
        data: null,
        messages: []
    }
    const item = await getInstanceById(req.params.id, "Payment")
if(item){
    result.success= true
    result.data= item.instance
}
result.messages = [...item.messages]
    res.status(item.status)
    return res.send(result)

}
const update = async (req,res,next)=>{
    result = {
        success : true,
        data : null,
        messages : []
    }
    const reservation = await getInstanceById(req.body.reservationId, "Reservation")
    if(reservation.success){
        const item = await getInstanceById(req.params.id, "Payment")
    if(item.success){
        await item.instance.update({
            reservationId: req.body.reservationId,
            amount: req.body.amount,
            paymentWay: req.body.paymentWay,
            dateTime: req.body.dateTime,
            paymentInfo: req.body.paymentInfo

        });
        result.data= item.instance
        result.messages.push('Payment updated successfully');
    }else {result.messages = [...item.messages];
    res.status(item.status);
    }
    }else{
        res.status(409);
        result.success = false,
        result.messages.push('The reservation Id not found')
    }
    
    return res.send(result);

    }
    const destroy = async (req,res,next) =>{
        result = {
            success: true,
            data: null,
            messages: []
        }
        const item = await getInstanceById(req.params.id, "Payment")
        if(item.success){
            await item.instance.destroy();
            result.messages.push('Payment deleted successfully');
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