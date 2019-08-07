const { body } = require('express-validator');

const validate = (method) => {
    switch(method) {
        case 'deleteComment' : {
            return [
                body('tweetId')
                .exists().withMessage('tweetId doesn\'t exist')
                .isInt({min : 1}),
                body('userId')
                .exists().withMessage('userId doesn\'t exist')
                .isString().withMessage('userId must be string')
            ]
        }

        case 'saveComment' : {
            return [
                body('tweetId')
                .exists().withMessage('tweetId doesn\'t exist')
                .isInt({min : 1}),
                body('userId')
                .exists().withMessage('userId doesn\'t exist')
                .isString().withMessage('userId must be string'),
                body('textMsg')
                .exists().withMessage('textMsg does\'t exist')
                .isString().withMessage('textMsg must be string')
                .isLength({min : 1,max : 280}).withMessage('textMsg length must be from 1 upto 280') 
            ]
        }

        case 'updateComment' : {
            return [
                body('tweetId')
                .exists().withMessage('tweetId doesn\'t exist')
                .isInt({min : 1}),
                body('userId')
                .exists().withMessage('userId doesn\'t exist')
                .isString().withMessage('userId must be string'),
                body('textMsg')
                .exists().withMessage('textMsg does\'t exist')
                .isString().withMessage('textMsg must be string')
                .isLength({min : 1,max : 280}).withMessage('textMsg length must be from 1 upto 280') 
            ]
        }
    }
}

module.exports = {
    validate : validate
}