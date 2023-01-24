var express = require('express');
var router = express.Router();
const models = require("../models");
const permission = require('../models/permission');

/* GET home page. */
router.get('/', async (req, res, next)=> {
  const user = await models.User.findByPk(1);
  console.log(await user.can("company:approve"))
  return res.send("done");
  });

module.exports = router;
