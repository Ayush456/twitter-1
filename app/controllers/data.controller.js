const queryFollow = require('../biz/queryFollow');
const queryUser = require('../biz/queryUser');
const utils = require('../biz/utils');
const queryTweet = require('../biz/queryTweet');
const queryHashTags = require('../biz/queryHashtag');
const queryComment = require('../biz/queryComment');
const queryLike = require('../biz/queryLike');
class DataController {

    //checked
    async isFollowing(req,res) {
        utils.addToResponse(res);
        try{
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
        utils.addToResponse(res);
        try{
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
        utils.addToResponse(res);
        try {
            const data = {userId : req.params.userId};
            const user = await queryUser.getUserById(data);
            if(user) {
                const userProfile = dataOperation.userToProfile(user);
                return res.send(userProfile);
            }
            return res.status(418).send();
        } catch(error) {
            return res.status(500).send(error);
        }
    }

    //checked
    async getFollowers(req,res) {
        utils.addToResponse(res);
        try {
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
        utils.addToResponse(res);
        try {
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
        utils.addToResponse(res);
        try {
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
        utils.addToResponse(res);
        try {
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
        utils.addToResponse(res);
        try {
            const data = { userId : req.params.userId, lastTweetCount : req.params.lastTweetCount };
            
            const tweets = await queryTweet.getTweetsOfFriends(data);
            // const likes = await queryLike.getLikesOfFriends(data);
            // const comments = await queryComment.getCommnetsOfFriends(data);  
            let feeds = {};
            feeds.tweets = tweets;
            feeds.lastTweetCount = tweets.length;
            res.send(feeds);
        } catch(error) {
            res.status(500).sendfile(error);
        }
    }   
     
    async getFeed(req,res) {
        utils.addToResponse(res);
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(422).json({errors : errors.array() });
            }

        } catch(error) {

        }
    }

    // checked
    async getUserPP(req,res) {
        utils.addToResponse(res);
        try {
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
        utils.addToResponse(res);
        try {
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
        utils.addToResponse(res);
        try {
            const data = {"offset" : req.params.offset};
            const trends = await queryHashTags.getTrends(data);
            return res.send(trends);
        } catch (error) {
            return res.status(500).sendfile(error);
        }
    }

}

module.exports = DataController;