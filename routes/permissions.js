var express= require('express');
const { store, index, show, update, destroy } = require('../controllers/permissionController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const multer = require('multer');
const { body, check } = require('express-validator');
const sendError = require("../services/errorService");
var router= express.Router()

   
router.post('/',
isAuthenticated,
async(req, res,next)=>{
if(await req.user.can('permission:assign')){
  return next();
}
return sendError(res,"You don't have persmission to continue",403)
},
  store);

router.get('/',
isAuthenticated,
async(req, res,next)=>{
if(await req.user.can('permission:index')){
  return next();
}
return sendError(res,"You don't have persmission to continue",403)
},
index);
router.get('/:id', 
isAuthenticated,
async(req, res,next)=>{
if(await req.user.can('permission:show')){
  return next();
}
return sendError(res,"You don't have persmission to continue",403)
},
show);
router.put('/:id',
isAuthenticated,
async(req, res,next)=>{
if(await req.user.can('permission:update')){
  return next();
}
return sendError(res,"You don't have persmission to continue",403)
},
update);
router.delete('/:id',
isAuthenticated,
async(req, res,next)=>{
if(await req.user.can('permission:destroy')){
  return next();
}
return sendError(res,"You don't have persmission to continue",403)
},
destroy);


module.exports = router