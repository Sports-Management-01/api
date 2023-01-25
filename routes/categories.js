var express= require('express');
const { store, destroy } = require('../controllers/categoryController');
var router= express.Router()
const multer = require('multer');
const { body, check } = require('express-validator');
const { storage, uploadFilter } = require('../services/uploadService');
const checkErrors = require('../middlewares/checkErrors');
const { index, show, update } = require('../controllers/categoryController');

const upload = multer({
    storage: storage,
    fileFilter: uploadFilter('image'),
    limits: {
        fileSize: 1_000_000
    }
}).single('icon')

let uploadErrors = ''
router.post('/', function (req, res, next) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            uploadErrors = err.message
        } else if (err) {
            uploadErrors = 'file is required to be an image'
        }
        return next()
    })
},
check('icon').custom((value, { req }) => {
    if (req.file) {
        return true
    }
    return false
}).withMessage(function () {
    return `The icon is invalid: ${uploadErrors?.toLocaleLowerCase() || ''}`
}),
body('name', 'Name length should be between 2 and 20').isLength({ min: 2, max: 20 }),
checkErrors,
store);
router.get('/', index);
router.get('/:id', show);
router.put('/:id', function (req, res, next) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            uploadErrors = err.message
        } else if (err) {
            uploadErrors = 'file is required to be an image'
        }
        return next()
    })
},
body('name', 'Name length should be between 2 and 20').isLength({ min: 2, max: 20 }),
checkErrors, update);
router.delete('/:id', destroy);


module.exports = router