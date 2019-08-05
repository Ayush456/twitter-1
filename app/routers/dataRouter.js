const express = require('express');
const router = express.Router();
const UserController = require('../controllers/data.controller');
const user = new UserController();

router.get('/isfollowing/:data',user.isFollowing);  //{userOne,userTwo}

router.get('/isfollowed/:data',user.isFollowed);   //{userOne,userIdTwo}

router.get('/profile/:data',user.getProfile);      //{userID}

router.get('/followers/:data',user.getFollowers);    //{userId}

router.get('/following/:data',user.getFollowings);     //{userId}

// router.post('/profile/edit',user.);      //{userId,....}

router.get('/tweets/:data',user.getTweets);       //{userId}

router.get('/likes/:data',user.getLikes);        //{userId}   

router.get('/feeds/:data',user.getFeeds);       //{userId}

router.get('/feed/:data',user.getFeed);         //{tweetId}






module.exports = router;