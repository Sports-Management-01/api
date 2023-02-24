var express = require('express');
var router = express.Router();
const { store,login, index,show,update,destroy,getUsersRole, companyApproved } = require('../controllers/userController');
const {isAuthenticated} = require("../middlewares/isAuthenticated");
const multer = require("multer");
const { storage, uploadFilter  } = require("../services/uploadService");
const { phoneValdation,nameValidation, emailValidation,  passwordValidation, imageValdation, checkUpload, errorResponse} = require("../services/validationService");
const sendError = require('../services/errorService')
const {sendEmail, sendPosta} = require('../services/mailService')

const upload = multer({
  storage: storage,
  fileFilter: uploadFilter('image'),
  limits: {
      fileSize: 1_000_000
  }
}).single('image')

let uploadErrors = ''
/* //START-Create Reset Password Link with Send to Email
/* send reset password link in email */
/* router.post('/reset-password-email', function(req, res, next) {
 
  var email = req.body.email;

  //console.log(sendEmail(email, fullUrl));

  connection.query('SELECT * FROM users WHERE email ="' + email + '"', function(err, result) {
      if (err) throw err;
       
      var type = ''
      var msg = ''
 
      console.log(result[0]);
   
      if (result[0].email.length > 0) {

         var token = randtoken.generate(20);

         var sent = sendPosta(email, token);

           if (sent != '0') {

              var data = {
                  token: token
              }

              connection.query('UPDATE users SET ? WHERE email ="' + email + '"', data, function(err, result) {
                  if(err) throw err
       
              })

              type = 'success';
              msg = 'The reset password link has been sent to your email address';

          } else {
              type = 'error';
              msg = 'Something goes to wrong. Please try again';
          }

      } else {
          console.log('2');
          type = 'error';
          msg = 'The Email is not registered with us';

      }
  
      req.flash(type, msg);
      res.redirect('/');
  });
}) */
//END - send reset password link in email
/* reset page */
router.get('/reset-password', function(req, res, next) {
  res.render('reset-password', {
  title: 'Reset Password Page',
  token: req.query.token
  });
  });
  /* reset page */
//START- Create Reset/Update Password route
/* update password to database */
router.post('/update-password', function(req, res, next) {
 
  var token = req.body.token;
  var password = req.body.password;

 connection.query('SELECT * FROM users WHERE token ="' + token + '"', function(err, result) {
      if (err) throw err;

      var type
      var msg

      if (result.length > 0) {
              
            var saltRounds = 10;

           // var hash = bcrypt.hash(password, saltRounds);

          bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {

                 var data = {
                      password: hash
                  }

                  connection.query('UPDATE users SET ? WHERE email ="' + result[0].email + '"', data, function(err, result) {
                      if(err) throw err
                 
                  });

                });
            });

          type = 'success';
          msg = 'Your password has been updated successfully';
            
      } else {

          console.log('2');
          type = 'success';
          msg = 'Invalid link; please try again';

          }

      req.flash(type, msg);
      res.redirect('/');
  });
})
//END- Create Reset/Update Password route */
/* GET users listing. */
router.get('/mail', isAuthenticated ,async(req,res,next)=>(sendEmail(req.user, "reservationCancellation", {
  date: "2023-01-01",
  field: "Stad Alarab"
})))
/**Fill  ApprovedAt To That company */
router.put('/approve/:id', isAuthenticated , async(req, res, next) => {
  if(await req.user.can('company:approve')) {
    console.log(req.user.can('company:approve'))
    return next()
  }
  return sendError(res,"You don't have permission to continue",403)
},
companyApproved)
/**END */
router.post(
  "/register",
 /*  (req, res, next) => {
    upload (req, res, (err) => checkUpload(err, next));
  }, */
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

router.get("/companies", showCopmanies)

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
  function (req, res, next) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            uploadErrors = err.message
        } else if (err) {
            uploadErrors = 'file is required to be an image'
        }
        return next()
    })
},
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
//GetusersWithRole
router.get("/usersrole", 
  isAuthenticated,
  async(req, res, next) => {
    if(await req.user.can('role:index')) {
      console.log(req.user.can('role:index'))
      return next()
    }
    return sendError(res,"You don't have permission to continue",403)
  },
  getUsersRole

  );

//END
module.exports = router;
