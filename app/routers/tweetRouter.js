const express = require('express');
const router = express.Router();
const TweetController = require('../controllers/tweet.controller');
const tweet = new TweetController();
const tweetValidator = require('../validators/tweet.validator');


router.post('/like',tweetValidator.validate('like'),tweet.like);                // {tweetId,userId}

router.post('/',tweetValidator.validate('saveTweet'),tweet.saveTweet);          // {userId,textMsg}

router.post('/retweet',tweetValidator.validate('retweet'),tweet.retweet);       // {tweetId,userId,textMsg}

router.delete('/',tweetValidator.validate('deleteTweet'),tweet.deleteTweet);    // {tweetId,userId}

router.put('/',tweetValidator.validate('editTweet'),tweet.editTweet);           // {tweetId,textMsg,userId}

router.get('*', (req, res) => res.status(404).send());

module.exports = router;