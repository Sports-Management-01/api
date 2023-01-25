const models = require('../models');
const { categoryTransformer } = require('../transformer/categoryTransformer');

const store = async (req,res,next)=>{
    const result = {
        success: true,
        data: null,
        messages: [],
      };
    const category = await models.Category.create({
        name: req.body.name,
        isActive: req.body.isActive,
        icon: req?.file?.filename
    });

    if (category){
        result.data = categoryTransformer(category);
        result.messages.push('Category created successfully')
    } else {
        result.success = false;
        result.messages.push("Please try again later");
    }
    return res.send(result);

}
module.exports = {
    store 
}