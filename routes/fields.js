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

var storages = multer.diskStorage({


    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
      filename: function(req, file, callback) {
        console.log(file);
        if(file.originalname.length>6)
          callback(null, file.fieldname + '-' + Date.now() + file.originalname.substr(file.originalname.length-6,file.originalname.length));
        else
          callback(null, file.fieldname + '-' + Date.now() + file.originalname);
    
      }
    });
    var upload = multer({storage: storage}).any('uploadedImages');
    

    
    // const upload = multer({ storage: storages });
//     const upload = multer({
//         storage: storage,
//         fileFilter: uploadFilter('image'),
//         limits: {
//             fileSize: 1_000_000
//         }
//     }).single('image')

// router.post('/', 
// upload.fields([ {
//     name: 'image', maxCount: 5
//   }]), function (req, res, next) {
//     (req, res, function (err) {
//         if (err instanceof multer.MulterError) {
//             uploadErrors = err.message
//         } else if (err) {
//             uploadErrors = 'file is required to be an image'
//         }
//         return next()
//     })
// },
// check('image').custom((value, { req }) => {
//     if (req.file) {
//         return true
//     }
//     return false
// }).withMessage(function () {
//     return `The icon is invalid: ${uploadErrors?.toLocaleLowerCase() || ''}`
// }),
// body('name', 'Name length should be between 2 and 20').isLength({ min: 2, max: 20 }),
router.post('/',
function(req, res){
    upload(req, res, function(err){
      if(err){
        console.log(err);
        return;
      }
      console.log(req.files);
      res.end('Your files uploaded.');
      console.log('Yep yep!');
    });
    
  }, timeValidation,
checkErrors,

  store);

//     req, res, function (err) {
//         if (err instanceof multer.MulterError) {
//             uploadErrors = err.message
//         } else if (err) {
//             uploadErrors = 'file is required to be an image'
//         }
//         return next()
//     })
// },
// check('image').custom((value, { req }) => {
//     if (req.file) {
//         return true
//     }
//     return false
// }).withMessage(function () {
//     return `The image is invalid: ${uploadErrors?.toLocaleLowerCase() || ''}`
// }),
// body('name', 'Name length should be between 2 and 20').isLength({ min: 2, max: 20 }),


router.get('/', index);
router.get('/:id', show);
router.put('/:id', update);
router.delete('/:id', destroy);

// Search Route

module.exports = router