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
            const data = JSON.parse(req.params.data);
            const result = await queryFollow.isFollowing(data);
            return res.send(result);
        } catch(error) {
            return res.status(500).send(error);
        } 
    }

    //checked
    async isFollowed(req,res) {
        try{
            const data = JSON.parse(req.params.data);
            const result = await queryFollow.isFollowed(data);
            return res.send(result);
        } catch(error) {
            return res.status(500).sendfile(error);
        } 
    }

    //checked
    async getProfile(req,res) {
        try {
            const data = JSON.parse(req.params.data);
            const user = await queryUser.getUserById(data);
            if(user) {
                let userProfile = await dataOperation.userToProfile(user);
                return res.send(userProfile);
            }
            return res.send("User does not exist");
        } catch(error) {
            return res.status(500).send(error);
        }
    }

    //checked
    async getFollowers(req,res) {
        try {
            const data = JSON.parse(req.params.data);
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
            const data = JSON.parse(req.params.data);
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
            const data = JSON.parse(req.params.data);
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
            const data = JSON.parse(req.params.data);
            const user = queryUser.getUserById(user);
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
            const data = JSON.parse(req.params.data);
            const tweets = await queryTweet.getTweetsOfFriends(data);
            // const likes = await queryLike.getLikesOfFriends(data);
            // const comments = await queryComment.getCommnetsOfFriends(data);  
            let feeds = {};
            feeds.tweets = result;
            feeds.lastTweetCount = result.length;
            res.send(feeds);
        } catch(error) {
            res.status(500).sendfile(error);
        }
    }   
     
    async getFeed(req,res) {

    }

}

module.exports = DataController;