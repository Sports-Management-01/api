const { getInstanceById } = require("./modelService");
const models = require('../models');
const isReservationOwner = async(req, res, next) => {
   
    const item = await getInstanceById(req.params.id, "Reservation");
    if(item.success){
        const userId = req.user.id;
       if(item.instance.userId == userId)
        
            return next();
        
        else{
            return res.send("you don't have permission to update this reservation!!!")
        }
    }
    else{ return res.send("you don't have permission to update this reservation!!!")}
   
  
}

module.exports = isReservationOwner