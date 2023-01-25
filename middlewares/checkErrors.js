const { validationResult } = require('express-validator');

const checkErrors = (req, res, next) => {
    const result = {
        success: false,
        messages: [],
    };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
            result.messages.push(`${error.msg}`)
        })
        return res.send(result)
    }
    return next()
}

module.exports = checkErrors