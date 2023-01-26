var express = require('express');
var router = express.Router();
const { store,login } = require('../controllers/userController');
const multer = require("multer");
const { storage, uploadFilter  } = require("../services/uploadService");
const { nameValidation, emailValidation,  passwordValidation, imageValdation, checkUpload, errorResponse} = require("../services/validationService");


const upload = multer({
  storage: storage,
  fileFilter: uploadFilter("image"),
  limits: { fileSize: 1_000_000 },
}).single("image");

/* GET users listing. */
router.post(
  "/register",
  (req, res, next) => {
    upload(req, res, (err) => checkUpload(err, next));
  },
  imageValdation,
  nameValidation,
  emailValidation,
  passwordValidation,
  store
);
//LOGIN
router.post("/login", 
  emailValidation, 
  passwordValidation, 
  login);
//END LOGIN
module.exports = router;
