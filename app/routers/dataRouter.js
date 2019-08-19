const express = require('express');
const router = express.Router();
const DataController = require('../controllers/data.controller');
const data = new DataController();
const utils = require('../biz/utils');

router.get('/isfollowing/:userOne/:userTwo',utils.verifyToken,data.isFollowing);    //{userOne,userTwo}

router.get('/isfollowed/:userOne/:userTwo',utils.verifyToken,data.isFollowed);       //{userOne,userIdTwo}

router.get('/profile/:userId',utils.verifyToken,data.getProfile);          //{userID}

router.get('/followers/:userId',utils.verifyToken,data.getFollowers);    //{userId}

router.get('/followings/:userId',utils.verifyToken,data.getFollowings); //{userId}

router.get('/tweets/:userId',utils.verifyToken,data.getTweets);             //{userId}

router.get('/likes/:userId',utils.verifyToken,data.getLikes);                //{userId}   

router.get('/feeds/:lastTweetCount/:lastLikeCount',utils.verifyToken,data.getFeeds);                //{userId}

router.get('/feed/:tweetId',utils.verifyToken,data.getFeed);                   //{tweetId}

router.get('/profile_picture/:userId',utils.verifyToken,data.getUserPP);  //{userId}

router.get('/cover_picture/:userId',utils.verifyToken,data.getUserCP);  //{userId}

router.get('/trends/:offset',utils.verifyToken,data.getTrends);

router.get('*', (req, res) => res.status(404).send());

module.exports = router;