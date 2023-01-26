var express= require('express');
const { store, index, show, update, destroy } = require('../controllers/equipmentController');
const { nameValidation } = require('../services/validationService');
var router = express.Router();

router.post('/', nameValidation ,store)
router.get('/', index)
router.get('/:id', show)
router.put('/:id', nameValidation ,update)
router.delete('/:id', destroy)


module.exports = router