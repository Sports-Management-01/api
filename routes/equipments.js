var express= require('express');
const { store } = require('../controllers/equipmentController');
var router = express.Router();

router.post('/', store)


module.exports = router