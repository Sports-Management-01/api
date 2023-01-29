const {
    validationResult,
    body,
    check,
  } = require("express-validator");
  const multer = require("multer");

  const errorResponse = (req, res, next) => {
    const result = {
      success: false,
      data: null,
      messages: [],
    }
    //Extracts the validation errors from a request and makes them available in a Result object.
//Each error returned by .array() and .mapped() methods has the following format by default:
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors
        .array()
        .forEach((error) => result.messages.push(error.msg));
      res.status(422);
      return res.send(result);
    }
    return next();
};
//TO check if you're choose an image or another file
let uploadErrors = ""
const checkUpload = (err, next)=>{
    if(err instanceof multer.MulterError){
        uploadErrors = err.message
    }else if (err) {
        uploadErrors = "file is required to be an image";
      }
      return next();
    };
    //To validate NAME
    const nameValidation = [
        body("name")
          .trim()
          .isLength({ min: 3 })
          .withMessage("Minimum 3 characters required for the name")
          .escape()
          .notEmpty()
          .withMessage("Name can not be empty!")
          .bail(),
        errorResponse,
      ];
      //To validate EMAIL
      const emailValidation = [
        body("email")
          .trim()
          .isEmail()
          .withMessage("errors.email")
          .notEmpty()
          .withMessage("errors.email")
          .bail(),
        errorResponse,
      ];
      //To validate PASSWORD
      const passwordValidation = [
        body("password")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
          )
          .withMessage(
            "Password should be at least 6 charaters and contains capital, small ,numbers and spical charaters"
          )
          .notEmpty()
          .withMessage("Password can not be empty!"),
        errorResponse,
      ];
// To validate PHONE
      const phoneValdation = [
        body("phone")
          .isLength({ min: 6 })
          .optional({ nullable: true })
          .withMessage("Minimum 6 characters required for the phone!"),
        errorResponse,
      ];
      //To validate image 
      const imageValdation = [
        check("img")
          .custom((value, { req }) => {
            if (req.file) {
              return true;
            }
            return false;
          })
          .withMessage(function () {
            return `The image is invalid: ${uploadErrors?.toLocaleLowerCase()}`;
          }),
        errorResponse,
      ];
      const dateAfter = (date1, date2) => {
        return date2 >= date1
      }
      const getNowdate = (today)=>{
         today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var hh = today.getHours()
        if (hh < 10) {
          hh = '0' + hh
        }
        var min = today.curMinute = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes(); 
        var sec = today.curSeconds = today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds(),
        today =  yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min + ':' + sec;
        console.log(today)
        return today


      }

      const dateValidation = (date) => {
        return /^(?=\d)(?:(?:1[6-9]|[2-9]\d)?\d\d([-.\/])(?:1[012]|0?[1-9])\1(?:31(?<!.(?:0[2469]|11))|(?:30|29)(?<!.02)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/.test(date)
    // YYYY-MM-DD HH:MM:SS
      }
    

      module.exports = {
        nameValidation,
        emailValidation,
        passwordValidation,
        phoneValdation,
        imageValdation,
        checkUpload,
        errorResponse,
        dateAfter,
        getNowdate,
        dateValidation
      }