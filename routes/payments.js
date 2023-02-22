var express = require('express')
const { store, index, show, update, destroy } = require('../controllers/paymentController')
var router = express.Router()
const multer  = require('multer')
const upload = multer()

router.post('/',upload.none(), store)
router.get('/', index)
router.get('/:id', show)
router.put('/:id', update)
router.delete('/:id', destroy)


module.exports = router