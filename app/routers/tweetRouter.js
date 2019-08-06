const express = require('express');
const router = express.Router();
const TweetController = require('../controllers/tweet.controller');
const tweet = new TweetController();


router.get('/like/:data',tweet.like);       // {tweetId,userId}

router.post('/',tweet.saveTweet);           // {userId,textMsg,hashTags =[]}

router.post('/retweet',tweet.retweet);      // {tweetId,userId,textMsg,hashTags=[]}

router.delete('/:data',tweet.deleteTweet);  // {tweetId,userId}

router.put('/',tweet.editTweet);            // {tweetId,textMsg,userId}

router.get('*', (req, res) => res.status(404).send());

module.exports = router;