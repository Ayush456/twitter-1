const { body , param } = require('express-validator/check');

const validate = (method) => {
    switch(method) {
        case 'follow' : {
            return [
                body('userOne')
                .exists().withMessage('userOne doesn\'t exists')
                .isString().withMessage('userOne must be string'),
                body('userTwo','userTwo doesn\'t exist')
                .exists().withMessage('userOne doesn\'t exists')
                .isString().withMessage('userOne must be string')
            ]
        }

        case 'unfollow' : {
            return [
                body('userOne')
                .exists().withMessage('userOne doesn\'t exists')
                .isString().withMessage('userOne must be string'),
                body('userTwo','userTwo doesn\'t exist')
                .exists().withMessage('userOne doesn\'t exists')
                .isString().withMessage('userOne must be string')
            ]
        }

        case 'editProfile' : {

        }

        case 'changePasword' : {

        }
    }
}

module.exports = {
    validate : validate
}