var express= require('express');
const { store, index, update, show, destroy } = require('../controllers/reservationController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { dateGreterFromNow, dateAfter } = require('../services/validationService');
var router= express.Router()


router.post('/', isAuthenticated, dateGreterFromNow, dateAfter ,store);
router.get('/', index);
router.get('/:id', show);
router.put('/:id', isAuthenticated ,update);
router.delete('/:id', isAuthenticated ,destroy);



module.exports= router