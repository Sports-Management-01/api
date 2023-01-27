var express= require('express');
const { store, index, show, update, destroy } = require('../controllers/fieldController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
var router= express.Router()

router.post('/', isAuthenticated ,store);
router.get('/', index);
router.get('/:id', show);
router.put('/:id', update);
router.delete('/:id', destroy);


module.exports = router