const queryFollow = require('../biz/queryFollow');
const queryUser = require('../biz/queryUser');
const queryTweet = require('../biz/queryTweet');
const queryHashTags = require('../biz/queryHashtag');
const queryComment = require('../biz/queryComment');
const queryLike = require('../biz/queryLike');
const { validationResult } = require('express-validator');
const utils = require('../biz/utils');
class DataController {

    //checked
    async isFollowing(req,res) {
        try{
            res = await utils.addToResponse(res); 
            const userOne = await queryUser.getUserById({userId:req.params.userOne});
            const userTwo = await queryUser.getUserById({userId:req.params.userTwo});
            if(userOne && userTwo) {
                const data = {userOne : req.params.userOne,userTwo : req.params.userTwo };
                const result = await queryFollow.isFollowing(data);
                return res.send(result);
            }
            return res.status(418).send();
        } catch(error) {
            return res.status(500).send(error);
        } 
    }

    //checked
    async isFollowed(req,res) {
        try{
            res = await utils.addToResponse(res); 
            const userOne = await queryUser.getUserById({userId:req.params.userOne});
            const userTwo = await queryUser.getUserById({userId:req.params.userTwo});
            if(userOne && userTwo) {
                const data = {userOne : req.params.userOne,userTwo : req.params.userTwo };
                const result = await queryFollow.isFollowed(data);
                return res.send(result);
            }
            return res.status(418).send();
        } catch(error) {
            return res.status(500).sendfile(error);
        } 
    }

    //checked
    async getProfile(req,res) {
        try {
            res = await utils.addToResponse(res); 
            const data = {userId : req.params.userId};
            const user = await queryUser.getUserById(data);
            if(user) {
                const userProfile = utils.userToProfile(user);
                return res.send(userProfile);
            }
            return res.status(418).send();
        } catch(error) {
            return res.status(500).send(error);
        }
    }

    //checked
    async getFollowers(req,res) {
        try {
            res = await utils.addToResponse(res); 
            const data = {userId : req.params.userId};
            const user = queryUser.getUserById(data);
            if(user) {
                const followers = await queryFollow.getFollowers(data);
                return res.send(followers);
            }
            return res.status(418).send();
        } catch(error) {
            return res.status(500).send();
        }
    }

    // Checked
    async getFollowings(req,res) {
        try {
            res = await utils.addToResponse(res); 
            const data = {userId : req.params.userId};
            const user = queryUser.getUserById(data);
            if(user) {
                const followings = await queryFollow.getFollowings(data);
                return res.send(followings);
            }
            return res.status(418).send();
        } catch(error) {
            return res.status(500).send(error);
        }
    }

    // checked
    async getTweets(req,res) {
        try {
            res = await utils.addToResponse(res); 
            const data = {userId : req.params.userId};
            const user = queryUser.getUserById(data);
            if(user) {
                const result = await queryTweet.getTweetByUserId(data);
                return res.send(result)
            }
            return res.status(418).send();

        } catch(error) {
            return res.status(500).send(error);
        }
    }

    // checked
    async getLikes(req,res) {
        try {
            res = await utils.addToResponse(res); 
            const data = {userId : req.params.userId};
            const user = queryUser.getUserById(data);
            if(user) {
                const result = await queryTweet.getTweetsLikedBy(data);
                return res.send(result);
            }
            return res.status(418).send();

        } catch (error) {
            return res.status(500).sendfile(error)
        }
    }

    async getFeeds(req,res) {
        try {
            res = await utils.addToResponse(res); 
            const data = { userId : req.body.userId, lastTweetCount : req.params.lastTweetCount, lastLikeCount : req.params.lastLikeCount };
            const tweets = await queryTweet.getTweetsOfFriends(data);
            const likes = await queryLike.getLiksOfFriends(data);
            // const comments = await queryComment.getCommnetsOfFriends(data);  
            let feeds = {};
            feeds.lastTweetCount = parseInt(data.lastTweetCount,10) + tweets.length;
            feeds.lastLikeCount = parseInt(data.lastLikeCount,10) + likes.length;
            let allFeeds = tweets.concat(likes); 
            allFeeds.sort((a, b) => {return new Date(a.atTime) - new Date(b.atTime);});
            feeds.feeds = allFeeds;
            res.send(feeds);
        } catch(error) {
            res.status(500).sendfile(error);
        }
    }   
     
    async getFeed(req,res) {
        try {
            res = await utils.addToResponse(res); 
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(422).json({errors : errors.array() });
            }

        } catch(error) {

        }
    }

    // checked
    async getUserPP(req,res) {
        try {
            res = await utils.addToResponse(res); 
            const data = {userId : req.params.userId};
            const user = await queryUser.getUserById(data);
            if(user && user.user_pp) {
                res.set('Content-Type','image/jpeg');
                return res.download(user.user_pp);
            }
            return res.status(418).send();
        } catch(error) {
            return res.status(500).send(error);
        }
    }

    // checked
    async getUserCP(req,res) {
        try {
            res = await utils.addToResponse(res); 
            const data = {userId : req.params.userId};
            const user = await queryUser.getUserById(data);
            if(user && user.user_cp) {
                res.set('Content-Type','image/jpeg');
                return res.download(user.user_cp);
            }
            return res.status(418).send();
        } catch(error) {
            return res.status(500).send(error);
        }
    }

    async getTrends(req,res) {
        try {
            res = await utils.addToResponse(res); 
            const data = {"offset" : req.params.offset};
            const trends = await queryHashTags.getTrends(data);
            return res.send(trends);
        } catch (error) {
            return res.status(500).sendfile(error);
        }
    }

}

module.exports = DataController;