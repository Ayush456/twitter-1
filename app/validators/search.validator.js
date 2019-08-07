const { body } = require('express-validator');

const validate = (method) => {
    switch(method) {
        case 'getList' : {
            return [
                body('key')
                .exists().withMessage('key must exist')
                .isString().withMessage('key must be a string')
                .isLength({min:3,max:20}).withMessage('key length must be between 3 and 20'),
                body('offset')
                .exists().withMessage('offset must exist')
                .isInt({min:0}).withMessage('offset must be integer and greater than 0')
            ]
        }
    }
}

module.exports = {
    validate : validate
}