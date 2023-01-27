var express= require('express');
const { store, index, update, show, destroy } = require('../controllers/reservationController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
var router= express.Router()


router.post('/', isAuthenticated ,store);
router.get('/', index);
router.get('/:id', show);
router.put('/:id', isAuthenticated ,update);
router.delete('/:id', isAuthenticated ,destroy);



module.exports= router