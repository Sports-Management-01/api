var express= require('express');
const { store, index, show, update, destroy } = require('../controllers/equipmentController');
const { nameValidation } = require('../services/validationService');
const {isAuthenticated} = require("../middlewares/isAuthenticated");
const sendError = require("../services/errorService");
var router = express.Router();

router.post('/', nameValidation ,store)
router.get('/', index)
router.get('/:id', show)
router.put('/:id' , isAuthenticated , async(req, res, next) => {
    if(await req.user.can('equipment:update')) {
      console.log(req.user.can('equipment:update'))
      return next()
    }
    return sendError(res,"You don't have permission to continue",403)
  }, update)
router.delete('/:id', destroy)


module.exports = router