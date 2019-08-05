const queryFollow = require('../biz/queryFollow');

class UserController {

    async isFollowing(req,res) {
        try{
            data = JSON.parse(req.params.data);
            console.log(data);
            const result = await queryFollow.isFollowing(data);
            res.send(result);
        } catch(error) {
            res.status(500).send(error);
        } 
    }

    async isFollowed(req,res) {
        try{
            data = JSON.parse(req.params.data);
            const result = await queryFollow.isFollowed(data);
            res.send(result);
        } catch(error) {
            res.status(500).send(error);
        } 
    }

    async getProfile(req,res) {

    }

    async getFollowers(req,res) {

    }

    async getFollowings(req,res) {

    }

    async getTweets(req,res) {

    }

    async getLikes(req,res) {

    }

    async getFeeds(req,res) {

    }

    async getFeed(req,res) {

    }

}

module.exports = UserController;