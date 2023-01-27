var express= require('express');
const { store, index, update, show, destroy } = require('../controllers/reservationController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { getNowdate, dateAfter, dateValidation, errorResponse } = require('../services/validationService');
var router= express.Router()
const { check } = require("express-validator");



router.post('/', isAuthenticated, 
 check('from', 'Start date should match the YYYY-MM-DD syntaxt').custom((value) => {
    return dateValidation(value)
}),
check('to', 'End date should match the YYYY-MM-DD syntaxt').custom((value) => {
    return dateValidation(value)
}), 
// check('dateTime').isISO8601().toDate().withMessage("Invalid day received"),
// check('from', 'The from date should be after now').custom((value)=>{
//     return getNowdate(value)
// }),
check('dateNow', 'The start date should not be small than date now')
.custom((value, { req }) => {
    return dateAfter(getNowdate(new Date()), req.body.from)
}),

check('datesOrder', 'The end date should be after the start date')
.custom((value, { req }) => {
    return dateAfter(req.body.from, req.body.to)
}),
errorResponse ,store);
router.get('/', index);
router.get('/:id', show);
router.put('/:id', isAuthenticated, check('from', 'Start date should match the YYYY-MM-DD syntaxt').custom((value) => {
    return dateValidation(value)
}),
check('to', 'End date should match the YYYY-MM-DD syntaxt').custom((value) => {
    return dateValidation(value)
}), 
// check('dateTime').isISO8601().toDate().withMessage("Invalid day received"),
// check('from', 'The from date should be after now').custom((value)=>{
//     return getNowdate(value)
// }),
check('dateNow', 'The start date should not be small than date now')
.custom((value, { req }) => {
    return dateAfter(getNowdate(new Date()), req.body.from)
}),

check('datesOrder', 'The end date should be after the start date')
.custom((value, { req }) => {
    return dateAfter(req.body.from, req.body.to)
}),
errorResponse ,update);
router.delete('/:id', isAuthenticated ,destroy);



module.exports= router