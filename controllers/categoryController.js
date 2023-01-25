const models = require('../models');

const store = async (req,res,next)=>{
    const result = {
        success: true,
        data: null,
        messages: [],
      };
    const category = await models.Category.create({


    })



}
module.exports = {
    store 
}