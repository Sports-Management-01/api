var express = require('express')
const { store, index, show, update, destroy } = require('../controllers/paymentController')
var router = express.Router()

router.post('/', store)
router.get('/', index)
router.get('/:id', show)
router.put('/:id', update)
router.delete('/:id', destroy)


module.exports = router