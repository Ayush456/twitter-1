const express = require('express');
const router = express.Router();
const TweetController = require('../controllers/tweet.controller');
const tweet = new TweetController();
const tweetValidator = require('../validators/tweet.validator');
const utils = require('../biz/utils');


router.post('/like',utils.verifyToken,tweetValidator.validate('like'),tweet.like);                // {tweetId,userId}

router.post('/',utils.verifyToken,tweetValidator.validate('saveTweet'),tweet.saveTweet);          // {userId,textMsg}

router.post('/retweet',utils.verifyToken,tweetValidator.validate('retweet'),tweet.retweet);       // {tweetId,userId,textMsg}

router.delete('/',utils.verifyToken,tweetValidator.validate('deleteTweet'),tweet.deleteTweet);    // {tweetId,userId}

router.put('/',utils.verifyToken,tweetValidator.validate('editTweet'),tweet.editTweet);           // {tweetId,textMsg,userId}

router.get('*', (req, res) => res.status(404).send());

module.exports = router;