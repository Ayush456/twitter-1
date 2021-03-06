const queryTweet = require('../biz/queryTweet');
const queryUser = require('../biz/queryUser');
const queryLike = require('../biz/queryLike');
const queryRetweet = require('../biz/queryRetweet');
const queryComment = require('../biz/queryComment');
const queryHashtag = require('../biz/queryHashtag');
const utils = require('../biz/utils');
const { validationResult } = require('express-validator');

class TweetController {
    
    async saveTweet(req,res) {
        try {
            res = await utils.addToResponse(res);
        
            const errors = validationResult(req);
            if(!errors.isEmpty()) return res.status(422).json({errors : errors.array() });
                
            const data = req.body;
            const user = await queryUser.getUserById(data);
            if(user) {
                utils.hashTags(data);
                const tweet = await queryTweet.saveTweet(data);
                await queryHashtag.insertHashTags({tweetId : tweet.insertId,hashTags : data.hashTags});
                await queryUser.increaseCount('user_tweet_count',{userId:data.userId})
                return res.send();
            }
            return res.status(404).send("user not found");
        } catch(error) {
            console.log(error);
            return res.status(500).sendfile("internal server error");
        }
    }

    async editTweet(req,res) {
        try {
            res = await utils.addToResponse(res); 

            const errors = validationResult(req);
            if(!errors.isEmpty()) return res.status(422).json({errors : errors.array() });

            const data = req.body;
            const tweet = await queryTweet.getTweetById(data);
            if(tweet) {
                utils.hashTags(data);
                await queryHashtag.deleteHashTags(data);
                await queryLike.deleteLikebyTweetId(data);
                await queryTweet.updateTweet(data);
                await queryHashtag.insertHashTags(data);
                return res.send();
            }
            return res.status(404).send("tweet does not exist");
        } catch(error) {
            console.log(error);
            return res.status(500).send("internal server error");
        }
    }

    async deleteTweet(req,res) {
        try {
            res = await utils.addToResponse(res); 

            const errors = validationResult(req);
            if(!errors.isEmpty()) return res.status(422).json({errors : errors.array() });

            const data = req.body;
            const result = await queryTweet.getTweet(data);
            if(result) {
                if(result.tweet_like_count != 0) await queryLike.deleteLikebyTweetId(data);
                if(result.tweet_comment_count != 0) await queryComment.deleteCommentsByTweetId(data);
                if(result.tweet_retweet_count != 0) await queryRetweet.deleteRetweetsByTweetId(data);
                await queryHashtag.deleteHashTags(data);
                if(result._isRetweeted) {
                    const from = await queryRetweet.getFromTweet(data);
                    if(from) await queryTweet.decreaseCount('tweet_retweet_count',{tweetId:from});
                }
                await queryTweet.deleteTweet(data);
                await queryUser.decreaseCount('user_tweet_count',data);
                return res.send("tweet deleted");
            }
            return res.status(404).send("tweet does not exist");
        } catch(error) {
            console.log(error);
            return res.status(500).sendfile("internal server error");
        }
    }

    async like(req,res) {
        try {
            res = await utils.addToResponse(res); 
            
            const errors = validationResult(req);
            if(!errors.isEmpty()) return res.status(422).json({errors : errors.array() });

            let  data = req.body;
            const tweet = await queryTweet.getTweetById(data);
            if(tweet) {
                if(tweet.user_id != data.userId) {
                    const isLiked = await queryLike.isLiked(data);
                    if(isLiked) {
                        await queryLike.deleteLike(data);
                        await queryTweet.decreaseCount('tweet_like_count',data);
                    }
                    else {
                        await queryLike.insertLike(data);
                        await queryTweet.increaseCount('tweet_like_count',data);
                    }
                    return res.send(!isLiked);
                }
                return res.send(true); 
            }
            return res.status(404).send("tweet does not exist found");
            
        } catch(error) {
            console.log(error);
            return res.status(500).send("internal server error");
        }
    }

    async retweet(req,res){
        try {
            res = await utils.addToResponse(res); 
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(422).json({errors : errors.array() });
            }

           let data = req.body;
           const user = await queryUser.getUserById(data);
           const tweet = await queryTweet.getTweetById(data);
           if(user && tweet) {
                utils.hashTags(data);
                const result = await queryTweet.saveTweet(data);
                const from = data.tweetId;
                data.tweetId = result.insertId;
                await queryHashtag.insertHashTags(data);
                await queryTweet.markRetweeted(data);
                await queryRetweet.makeRetweetLog({fromTweetId:from,tweetId:data.tweetId});
                await queryTweet.increaseCount('tweet_retweet_count',{tweetId:from});
                await queryUser.increaseCount('user_tweet_count',data);
                return res.send("retweeted");
           }
           return res.status(404).send("user or tweet does not exists");
        } catch(error) {
            console.log(error);
           return res.status(500).send("internal server error");
       }
    }
}

module.exports = TweetController;