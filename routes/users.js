var express = require('express');
var router = express.Router();
const { store,login, index,show,update,destroy } = require('../controllers/userController');
const {isAuthenticated} = require("../middlewares/isAuthenticated");
const multer = require("multer");
const { storage, uploadFilter  } = require("../services/uploadService");
const { phoneValdation,nameValidation, emailValidation,  passwordValidation, imageValdation, checkUpload, errorResponse} = require("../services/validationService");
const sendError = require('../services/errorService')

const upload = multer({
  storage: storage,
  fileFilter: uploadFilter("image"),
  limits: { fileSize: 1_000_000 },
});

/* GET users listing. */
router.post(
  "/register",
  (req, res, next) => {
    upload(req, res, (err) => checkUpload(err, next));
  },
 // imageValdation,
  nameValidation,
  emailValidation,
  passwordValidation,
  phoneValdation,
  store
);
//LOGIN
router.post("/login", 
  emailValidation, 
  //passwordValidation, 
  login);
//END LOGIN
//GET all users
router.get("/", 
  isAuthenticated,
  async(req, res, next) => {
    if(await req.user.can('role:index')) {
      console.log(req.user.can('role:index'))
      return next()
    }
    return sendError(res,"You don't have permission to continue",403)
  },
  index
  );
//END

//Get my profile
router.get(
  "/:id",
  isAuthenticated,
  show
);
//END

//Update my profile
router.put(
  "/:id",
  isAuthenticated,
 // (req, res, next) => { upload(req, res, (err) => checkUpload(err, next));},
 // imageValdation,
  nameValidation,
  emailValidation,
  passwordValidation,
  phoneValdation,
  update
);
//END update my profile

//Delete user 
router.delete(
  "/:id",
  isAuthenticated,
  async(req, res, next) => {
    if(await req.user.can('profile:delete')) {
      console.log(req.user.can('profile:delete'))
      return next()
    }
    return sendError(res,"You don't have permission to continue",403)
  },
  destroy
);
//END Delete user
module.exports = router;
