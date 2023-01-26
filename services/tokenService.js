const jwt = require("jsonwebtoken");
const models = require('../models')

const getToken = (data) => {
  return jwt.sign(
    {
      ...data,
    },
    process.env.secretKey,
    {
      expiresIn: 60 * 60 * 24 * 7,
    }
  );
};

verifyToken = async(token) => {
  let result = null;
  try {
    const payload = jwt.verify(token, process.env.secretkey);
    if (payload) {
     const user = await models.User.findByPk(payload.id);
     result = user;

    }
  } catch (error) {
   
  }
  return result;
};

module.exports = {
  getToken,
  verifyToken,
};
