const queryFollow = require('../biz/queryFollow');
const queryUser = require('../biz/queryUser');
const dataOperation = require('../biz/dataOperation');
const queryTweet = require('../biz/queryTweet');
const queryComment = require('../biz/queryComment');
const queryLike = require('../biz/queryLike');
class DataController {

    //checked
    async isFollowing(req,res) {
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
        try {
            const data = {userId : req.params.userId};
            const user = queryUser.getUserById(data);
            if(user) {
                const result = await queryTweet.getTweetsLikedBy();
                return res.send(result);
            }
            return res.status(418).send();

        } catch (error) {
            return res.status(500).send(error)
        }
    }

    async getFeeds(req,res) {
        try {
            const data = { userId : req.params.userId, lastTweetCount : req.params.lastTweetCount };
            const tweets = await queryTweet.getTweetsOfFriends(data);
            // const likes = await queryLike.getLikesOfFriends(data);
            // const comments = await queryComment.getCommnetsOfFriends(data);  
            let feeds = {};
            feeds.tweets = tweets;
            feeds.lastTweetCount = result.tweets;
            res.send(feeds);
        } catch(error) {
            res.status(500).sendfile(error);
        }
    }   
     
    async getFeed(req,res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(422).json({errors : errors.array() });
            }

        } catch(error) {

        }
    }

}

module.exports = DataController;