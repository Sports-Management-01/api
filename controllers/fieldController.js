const models = require("../models");
const { getInstanceById } = require("../services/modelService");
const {
  timeValidation,
  dateValidation,
} = require("../services/validationService");
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");

const models = require('../models');
const { getInstanceById } = require('../services/modelService');

const store = async (req,res,next)=>{
    const result = {
        success: true,
        data: null,
        messages: [],
      };
      
      const [field, created] = await models.Field.findOrCreate({
        
        where: {
         name: req.body.name
        },
        defaults: {
         companyId: req?.user?.id,
         categoryId: req.body.categoryId,
         length: req.body.length,
         width: req.body.width,
         hourPrice: req.body.hourPrice,
         from: req.body.from,
         to: req.body.to,
         stateId: req.body.stateId,
         adress: req.body.adress,
         latitude: req.body.latitude,
         longitude: req.body.longitude,
         image: req?.file?.filename,//we have to make loop on files to push all images into array after that covert aray to json json.stingyfy
         isActive: req.body.isActive
        } 
     });
     if(created){
        result.data= field,
        result.messages.push('Field created successfully')
    }else{
        res.status(409);
        result.success = false,
        result.messages.push('Field already available')
    }
    return res.send(result)
}
const index = async (req,res,next)=>{
    const result = {
        success: true,
        data: null,
        messages: []
    }
  }

  const fields = await models.Field.findAll({
    include: relations,
    where: filter,
  });

  if (fields.length > 0) {
    result.data = fields;
    result.messages.push("You have all fields");
  } else {
    res.status(422);
    result.success = false;
    result.messages.push("No reservation This time is available");
  }
  return res.send(result);
};
const show = async (req, res, next) => {
  const result = {
    success: true,
    data: null,
    messages: [],
  };
  const item = await getInstanceById(req.params.id, "Field");
  if (item.success) {
    (result.success = true), (result.data = item.instance.dataValues);
  }
  result.messages = [...item.messages];
  res.status(item.status);
  return res.send(result);
};
const update = async (req, res, next) => {
  const result = {
    success: true,
    data: null,
    messages: [],
  };
  const item = await getInstanceById(req.params.id, "Field");
  if (item.success) {
    if (item.instance.name != req.body.name) {
      const newNameAlreadyUsed = await models.Field.findOne({
        where: { name: req.body.name },
      });
      if (newNameAlreadyUsed) {
        return res.send("new name is already token");
      }
    }
    await item.instance.update({
      name: req.body.name,
      categoryId: req.body.categoryId,
      length: req.body.length,
      width: req.body.width,
      hourPrice: req.body.hourPrice,
      from: req.body.from,
      to: req.body.to,
      stateId: req.body.stateId,
      adress: req.body.adress,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      image: req?.file?.filename,
      isActive: req.body.isActive,
    });
    result.data = item.instance;
    result.messages.push("Field updated successfully");
  } else {
    result.messages = [...item.messages];
    res.status(item.status);
  }
  return res.send(result);
};
const destroy = async (req, res, next) => {
  const result = {
    success: true,
    data: null,
    messages: [],
  };
  const item = await getInstanceById(req.params.id, "Field");
  if (item.success) {
    await item.instance.destroy();
    result.messages.push("Field deleted successfully");
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
  destroy,
};
