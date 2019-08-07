const { body } = require('express-validator');

const validate = (method) => {
    switch(method) {
        case 'follow' : {
            return [
                body('userOne')
                .exists().withMessage('userOne doesn\'t exist')
                .isString().withMessage('userOne must be string'),
                body('userTwo')
                .exists().withMessage('userOne doesn\'t exist')
               .isString().withMessage('userOne must be string')
            ]
        }

        case 'unfollow' : {
            return [
                body('userOne')
                .exists().withMessage('userOne doesn\'t exist')
                .isString().withMessage('userOne must be string'),
                body('userTwo')
                .exists().withMessage('userOne doesn\'t exist')
                .isString().withMessage('userOne must be string')
            ]
        }

        case 'editProfile' : {
            return [
                body('userId')
                .exists().withMessage('userId doesn\'t exist')
                .isString().withMessage('userId must be string'),
                body('userDob')
                .exists().withMessage('userDob doesn\'t exist'),
                body('userStatus')
                .exists().withMessage('userStatus doesn\'t exist')
                .isString().withMessage('userStatus must be string')
            ]
        }

        case 'changePassword' : {
            return [
                body('userId')
                .exists().withMessage('userId doesn\'t exist')
                .isString().withMessage('userId must be string'),
                body('oldPassword')
                .exists().withMessage('userId doesn\'t exist')
                .isString().withMessage('oldPassword must be string')
                .isByteLength({min:8,max:15}).withMessage('password should have 8 to 15 characters'),
                body('newPassword')
                .exists().withMessage('userId doesn\'t exist')
                .isString().withMessage('oldPassword must be string')
                .isByteLength({min:8,max:15}).withMessage('password should have 8 to 15 characters')
            ]
        }
    }
}

module.exports = {
    validate : validate
}