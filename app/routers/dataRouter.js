const express = require('express');
const router = express.Router();
const DataController = require('../controllers/data.controller');
const data = new DataController();

router.get('/isfollowing/:data',data.isFollowing);  //{userOne,userTwo}

router.get('/isfollowed/:data',data.isFollowed);    //{userOne,userIdTwo}

router.get('/profile/:data',data.getProfile);       //{userID}

router.get('/followers/:data',data.getFollowers);   //{userId}

router.get('/followings/:data',data.getFollowings); //{userId}

router.get('/tweets/:data',data.getTweets);         //{userId}

router.get('/likes/:data',data.getLikes);           //{userId}   

router.get('/feeds/:data',data.getFeeds);           //{userId}

router.get('/feed/:data',data.getFeed);             //{tweetId}

router.get('*', (req, res) => res.status(404).send());

module.exports = router;