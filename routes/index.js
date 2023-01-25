var express = require('express');
var router = express.Router();
const models = require("../models");
const permission = require('../models/permission');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200);
  res.send({
    success: true,
    data: null,
    messages: []
  })
});

  
module.exports = router;
