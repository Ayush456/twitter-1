const { body } = require('express-validator');


const validate = (method) => {
    switch(method) {
        case 'like' : {
            return [
                body('tweetId')
                .exists().withMessage('tweetId doesn\'t exist')
                .isInt({min : 1}),
                body('userId')
                .exists().withMessage('userId doesn\'t exist')
                .isString().withMessage('userId must be string')
            ]
        }

        case 'deleteTweet' : {
            return [
                body('userId')
                .exists().withMessage('userId doesn\'t exist')
                .isString().withMessage('userId must be string'),
                body('tweetId')
                .exists().withMessage('tweetId doesn\'t exist')
                .isInt({min : 1})
            ]
        }

        case 'saveTweet' : {
            return [
                body('userId')
                .exists().withMessage('userId doesn\'t exist')
                .isString().withMessage('userId must be string'),
                body('textMsg')
                .exists().withMessage('textMsg does\'t exist')
                .isString().withMessage('textMsg must be string')
                .isLength({min : 1,max : 280}).withMessage('textMsg length must be from 1 upto 280')   
            ]
        }

        case 'retweet' : {
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

        case 'editTweet' : {
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