const express = require('express');
const router = express.Router();
const TweetController = require('../controllers/tweet.controller');
const tweet = new TweetController();

// post
// delete
// update
//

router.get('/like/:data',tweet.like);

router.post('/',tweet.saveTweet);

router.post('/retweet',tweet.retweet);

router.delete('/:data',tweet.deleteTweet);

router.put('/',tweet.editTweet);

router.get('*', (req, res) => res.status(404).send());

module.exports = router;