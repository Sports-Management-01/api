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

      module.exports = {
        nameValidation,
        emailValidation,
        passwordValidation,
        phoneValdation,
        imageValdation,
        checkUpload,
        errorResponse
      }