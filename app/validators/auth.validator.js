const { body } = require('express-validator');

const validate = (method) => {
    switch(method) {
        case 'checkLoginReq': {
            return [
                body('user_email')
                .exists().withMessage('request must have user_email field')
                .isEmail().withMessage('request must have correct email'),
                body('user_password')
                .exists().withMessage('request must have user_password')
                .isString()
                .isLength({min:5,max:15}).withMessage('request must have password of length 8-15')
            ]
        }

        case 'signupReq': {
            return [
                body()
            ]
        }
    }
}

module.exports = {
    validate : validate
}