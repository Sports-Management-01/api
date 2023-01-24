var express = require('express');
var router = express.Router();
const models = require("../models");
const permission = require('../models/permission');

/* GET home page. */
router.get(
  '/',
  isAuthenticated,
  function(req, res, next) {
    if (req.user.can('company:approve')) {
      return next()
    }
    // return error
  },
  
  async (req, res, next)=> {
  const user = await models.User.findByPk(1);
  if (await user.can("company:approve")) {
    return next()
  }
  return res.send("done");
  });

  
module.exports = router;
