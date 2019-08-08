const express = require('express');
const router = express.Router();
const DataController = require('../controllers/data.controller');
const data = new DataController();

router.get('/isfollowing/:userOne/:userTwo',data.isFollowing);    //{userOne,userTwo}

router.get('/isfollowed/:userOne/:userTwo',data.isFollowed);       //{userOne,userIdTwo}

router.get('/profile/:userId',data.getProfile);          //{userID}

router.get('/followers/:userId',data.getFollowers);    //{userId}

router.get('/followings/:userId',data.getFollowings); //{userId}

router.get('/tweets/:userId',data.getTweets);             //{userId}

router.get('/likes/:userId',data.getLikes);                //{userId}   

router.get('/feeds/:userId/:lastTweetCount',data.getFeeds);                //{userId}

router.get('/feed/:tweetId',data.getFeed);                   //{tweetId}

router.get('/profile_picture/:userId',data.getUserPP);  //{userId}

router.get('/cover_picture/:userId',data.getUserCP);  //{userId}

router.get('/trends/:offset',data.getTrends);

router.get('*', (req, res) => res.status(404).send());

module.exports = router;