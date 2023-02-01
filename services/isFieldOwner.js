const { getInstanceById } = require("./modelService");
const models = require('../models');
const isFieldOwner = async(req, res, next) => {
   
    const item = await getInstanceById(req.params.id, "Field");
    if(item.success){
        const companyId = req.user.id;
       if(item.instance.companyId == companyId)
        
            return next();
        
        else{
            return res.send("you don't have permission to update this field!!!")
        }
    }
    else{ return res.send("you don't have permission to update this field!!!")}
   
  
}

module.exports = isFieldOwner