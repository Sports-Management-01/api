var express = require("express");
var router = express.Router();
const { store, update, destroy,index, show } = require("../controllers/roleController");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const {
  nameValidation,
  errorResponse,
} = require("../services/validationService");
const sendError = require("../services/errorService");

//Create Role Route
router.post(
  "/",
  isAuthenticated,
  async (req, res, next) => {
    if (await req.user.can("role:store")) {
      return next();
    }
  },
  store
);
//END

//Update Role Route
router.put(
  "/:id",
  isAuthenticated,
  async (req, res, next) => {
    if (await req.user.can("role:update")) {
      return next();
    }
    return sendError(res,"You don't have persmission to continue",403)

  },
  update
);
//END

//Delete role 
router.delete(
  "/:id",
  isAuthenticated,
  async(req, res, next) => {
    if(await req.user.can('role:destroy')) {
      console.log(req.user.can('role:destroy'))
      return next()
    }
    return sendError(res,"You don't have persmission to continue",403)
  },
  destroy
);
//END Delete role
//GET all roles
router.get("/", 
  isAuthenticated,
  async(req, res, next) => {
    if(await req.user.can('role:index')) {
      console.log(req.user.can('role:index'))
      return next()
    }
    return sendError(res,"You don't have persmission to continue",403)
  },
  index
  );
//END 
//Get my role
router.get(
  "/:id",
  isAuthenticated,
  async(req, res, next) => {
    if(await req.user.can('role:show')) {
      console.log(req.user.can('role:show'))
      return next()
    }
    return sendError(res,"You don't have persmission to continue",403)
  },
  show
);
//END
module.exports = router;
