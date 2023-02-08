const models = require("../models");
const { getInstanceById } = require("../services/modelService");
const {
  timeValidation,
  dateValidation,
} = require("../services/validationService");
const {
  fieldTransformer,
  fieldsTransformer,
} = require("../transformer/fieldTransformer");
const { Op, QueryTypes } = require("sequelize");
const { Sequelize } = require("sequelize");
const { sequelize } = require("../models");
const dayjs = require("dayjs");

const store = async (req, res, next) => {
  const result = {
    success: true,
    data: null,
    messages: [],
  };
  let imagesArr = [];
  // to see if files field exist
  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
      imagesArr.push(req.files[i].filename);
    }

    console.log(imagesArr);
  }
  const [field, created] = await models.Field.findOrCreate({
    where: {
      name: req.body.name,
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
      image: JSON.stringify(imagesArr), //we have to make loop on files to push all images into array after that covert aray to json json.stingyfy
      isActive: req.body.isActive,
    },
  });
  if (created) {
    result.data = fieldTransformer(field);
    (result.data = field), result.messages.push("Field created successfully");
  } else {
    res.status(409);
    (result.success = false), result.messages.push("Field already available");
  }
  return res.send(result);
};
const index = async (req, res, next) => {
  const result = {
    success: true,
    data: null,
    messages: [],
  };

  let fieldQuery = "SELECT * FROM fields where 1=1 ";

  if (req.query?.category) {
    fieldQuery += " and `fields`.`categoryId` =" + req?.query?.category;
  }
  if (req.query?.time) {
    if (timeValidation(req.query.time)) {
      fieldQuery += " and `fields`.`from` <= '" + req.query.time + "'";
      fieldQuery += " and `fields`.`to` > '" + req.query.time + "'";
      if (dateValidation(req.query?.date)) {
        const datetime = req.query.date + " " + req.query.time + ":00";
        fieldQuery +=
          " AND NOT EXISTS(SELECT * FROM `reservations` WHERE `fields`.`id` = `reservations`.`fieldId` AND (`from` <= '" +
          datetime +
          "' AND `to` > '" +
          datetime +
          "'))";
      }
    }
  }
  fieldQuery += " AND `fields`.`deletedAt` IS NULL AND `fields`.`isActive`=1";

  const [fields, metadata] = await sequelize.query(fieldQuery);
  if (fields.length > 0) {
    result.data = fieldsTransformer(fields);
    result.messages.push("You have all fields");
  } else {
    res.status(422);
    result.success = false;
    result.messages.push("Please choose availabe date and time");
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
    result.success = true;
    result.data = fieldTransformer(item.instance.dataValues);
    result.data.Category = await item.instance.getCategory();
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
  console.log("item");
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

    const newData = {
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

      isActive: req.body.isActive,
    };
    let imagesArr = [];
    if (req.files) {
      const image = item.instance.image;
      for (let i = 0; i < req.files.length; i++) {
        imagesArr.push(req.files[i].filename);
      }
      console.log(imagesArr);
      newData.image = JSON.stringify([...imagesArr, ...JSON.parse(image)]);
    }

    console.log(`newData.image: ${newData.image}`);
    await item.instance.update(newData);
    result.data = fieldTransformer(item.instance);
    result.messages.push("Field updated successfully");
    console.log(item);
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
const checkAvailability = async (req, res, next) => {
  const result = {
    success: true,
    data: null,
    messages: [],
  };
  console.log(result)
  var times = [];
  // [{time: 09:00, available: true}, {time: 10:00, available: false}]
  console.log(req.body.date);
  const item = await getInstanceById(req.params.id, "Field");
  if (item.success) {
    result.success = true;
    const reservations = await models.Reservation.findAll({
      where: {
        fieldId: req.params.id,
        from: {
          [Op.gte]: req.body.date + " 00:00:00",
        },
        to: {
          [Op.lte]: req.body.date + " 23:59:59",
        },
      }}
      
    );
   
    const start = +item.instance.from.split(':')[0]; // 07:00
    const end = +item.instance.to.split(':')[0]; // 17:00
    console.log(start)
    console.log(end)
    for (var i = start; i < end; i++) {
      let timeSlot = i > 9 ? i : '0' + i
      const hour = timeSlot + ':00'
      timeSlot = req.body.date + ' ' + hour + ':00'
      const isReserved = timeisReserved(reservations, timeSlot)
      times.push({
        time: hour,
        available: !isReserved
      })
      console.log(times)
    }
     result.data = times
  } else {
    res.status(item.status);
    result.success = false;
    result.messages = [...item.messages];
  }
  return res.send(result);
};

const timeisReserved = (reservations, timeSlot) => {
  console.log(reservations)
  for (const reservation of reservations) {
    console.log()
    if (dayjs(reservation.from).format("YYYY-MM-DD HH:mm:ss") === timeSlot) {
      return true
    }
  }
  return false
}
module.exports = {
  store,
  index,
  show,
  update,
  destroy,
  checkAvailability,
};
