const models = require("../models");
const { getInstanceById } = require("../services/modelService");
const {
  categoryTransformer,
  categoriesTransformer,
} = require("../transformer/categoryTransformer");

const store = async (req, res, next) => {
  const result = {
    success: true,
    data: null,
    messages: [],
  };
  console.log(req.body)
  const [category, created] = await models.Category.findOrCreate({
    where: {
      name: req.body.name,
    },
    defaults: {
      isActive: req.body.isActive,
      icon: req?.file?.filename,
    },
  });

  if (created) {
    const equipments = await category.addEquipments(req.body.eqs)
    result.data = categoryTransformer(category);
    result.messages.push("Category created successfully");
  } else {
    res.status(409);
    result.success = false;
    result.messages.push("Category already available");
  }
  res.status(422);
  return res.send(result);
};
const index = async (req, res, next) => {
  const result = {
    success: true,
    data: null,
    messages: [],
  };

  const categories = await models.Category.findAll();
  if (categories) {
    result.data = categoriesTransformer(categories);
    result.messages.push("You have all categories");
  } else {
    res.status(422);
    result.success = false;
    result.messages.push();
  }
  console.log(result.data);
  return res.send(result);
};

const show = async (req, res, next) => {
  const result = {
    success: true,
    data: null,
    messages: [],
  };
  const item = await getInstanceById(req.params.id, "Category");
  console.log(item);
  if (item.success) {
    result.success = true;
    result.data = categoryTransformer(item.instance.dataValues);
    console.log(result.data);
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
  const { name, isActive } = req.body;

  const item = await getInstanceById(req.params.id, "Category");
  if (item.success) {
    const equipments = await item.instance.setEquipments(req.body.equipments)
    result.success = true;
    const newData = {
      name,
      isActive,
    };
    if (req.file) {
      newData.icon = req.file.filename;
    }
    await item.instance.update(newData);
    result.data = categoryTransformer(item.instance);
    result.messages.push("Category updated successfully");
  } else {
    result.messages = [...item.messages];
  }
  res.status(item.status);
  return res.send(result);
};
const destroy = async (req, res, next) => {
  const result = {
    success: true,
    data: null,
    messages: [],
  };
  const item = await getInstanceById(req.params.id, "Category");
  if (item.success) {
    result.success = true;
    await item.instance.destroy();
    result.messages.push("Category deleted successfully");
  } else {
    result.messages = [...item.messages];
  }
  res.status(item.status);
  return res.send(result);
};
// const categoryEquipment = async (req, res) => {
//   const equipment = await getInstanceById(req.body.equipmentId, "Equipment");
//   const category = await getInstanceById(req.body.categoryId, "Category");
//   if (category.success) {
//     const equAdded = await equipment.instance.addCategory(req.body.categoryId);
//     if (equAdded) {
//       return res.send({
//         success: true,
//         messages: ["Category has been added to the equipment list"],
//       });
//     } else {
//       return res.send({
//         success: false,
//         messages: ["Could not add the category"],
//       });
//     }
//   }
//   return res.send({
//     success: false,
//     messages: "Errors invalid cateogry Id",
//   });
// };
module.exports = {
  store,
  index,
  show,
  update,
  destroy
  // categoryEquipment,
};
