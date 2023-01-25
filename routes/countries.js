var express= require('express');
const { store, index, show, update, destroy } = require('../controllers/countryController');
const { nameValidation } = require('../services/validationService');
var router= express.Router()

router.post('/', nameValidation ,store)
router.get('/', index)
router.get('/:id', show)
router.put('/:id', update)
router.delete('/:id', destroy)
module.exports = router