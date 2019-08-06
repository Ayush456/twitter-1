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
            res.send(result);
        } catch(error) {
            res.status(500).send(error);
        } 
    }

    //checked
    async isFollowed(req,res) {
        try{
            const data = JSON.parse(req.params.data);
            const result = await queryFollow.isFollowed(data);
            res.send(result);
        } catch(error) {
            res.status(500).sendfile(error);
        } 
    }

    //checked
    async getProfile(req,res) {
        try {
            const data = JSON.parse(req.params.data);
            const user = await queryUser.getUserById(data);
            if(user) {
                let userProfile = await dataOperation.userToProfile(user);
                res.send(userProfile);
            }
            res.send("User does not exist");
        } catch(error) {
            res.status(500).send(error);
        }
    }

    //checked
    async getFollowers(req,res) {
        try {
            const data = JSON.parse(req.params.data);
            const followers = await queryFollow.getFollowers(data);
            console.log(followers);
            res.send(followers);
        } catch(error) {
            res.status(500).send();
        }
    }

    // Checked
    async getFollowings(req,res) {
        try {
            const data = JSON.parse(req.params.data);
            const followings = await queryFollow.getFollowings(data);
            res.send(followings);
        } catch(error) {
            res.status(500).send(error);
        }
    }

    // checked
    async getTweets(req,res) {
        try {
            const data = JSON.parse(req.params.data);
            const result = await queryTweet.getTweetByUserId(data);
            res.send(result)
        } catch(error) {
            res.status(500).send(error);
        }
    }

    // checked
    async getLikes(req,res) {
        try {
            const result = await queryTweet.getTweetsLikedBy(JSON.parse(req.params.data));
            res.send(result);
        } catch (error) {
            res.status(500).send(error)
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