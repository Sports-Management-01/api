var express= require('express');
const models = require('../models');
const { store, index, show, update, destroy } = require('../controllers/fieldController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const multer = require('multer');
const { body, check } = require('express-validator');
const { storage, uploadFilter } = require('../services/uploadService');
const Path = require('path');
const checkErrors = require('../middlewares/checkErrors');
const { timeValidation } = require('../services/validationService');
var router= express.Router()

     const upload = multer({
        storage: storage,
        fileFilter: uploadFilter('image'),
        limits: {
            fileSize: 1_000_000
        } 
    }).array('image')
let uploadErrors = " ";

router.post('/',
isAuthenticated,
function (req, res, next) {
  upload(req, res, function (err) {
     /*  if (err instanceof multer.MulterError) {
          uploadErrors = err.message
      } else if (err) {
          uploadErrors = 'file is required to be an image'
      } */
      return next()
  })
},
check('image').custom((value, { req }) => {
  if (req.files) {
    console.log(req.files)
      return true
  }
  return false
}).withMessage(function () {
  return `The image is invalid: ${uploadErrors?.toLocaleLowerCase() || ''}`
}),
checkErrors,
store);
//    


router.get('/', index);
router.get('/:id', show);
router.put('/:id', update);
router.delete('/:id', destroy);

// Search Route


module.exports = router