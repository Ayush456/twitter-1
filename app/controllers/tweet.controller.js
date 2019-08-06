const queryTweet = require('../biz/queryTweet');
const queryUser = require('../biz/queryUser');
const queryLike = require('../biz/queryLike');
const queryRetweet = require('../biz/queryRetweet');
const queryComment = require('../biz/queryComment');
const queryHashtag = require('../biz/queryHashtag');

class TweetController {
    
    // checked
    async saveTweet(req,res) {
        try {
            // validate token and check for user
            const data = req.body;
            const user = await queryUser.getUserById(data);
            if(user) {
                const tweet = await queryTweet.saveTweet(data);
                await queryHashtag.insertHashTags({tweetId : tweet.insertId,hashTags : data.hashTags});
                await queryUser.increaseCount('user_tweet_count',{userId:data.userId});
                return res.send();
            }
            return res.status(418).send();
        } catch(error) {
            return res.status(500).send(error);
        }
    }

    // checked
    async editTweet(req,res) {
        try {
            // validate token and check for user
            const data = req.body;
            const tweet = await queryTweet.getTweetById(data);
            if(tweet) {
                await queryHashtag.deleteHashTags(data);
                await queryLike.deleteLikebyTweetId(data);
                await queryTweet.updateTweet(data);
                await queryHashtag.insertHashTags(data);
                return res.send();
            }
            return res.status(418).send();
        } catch(error) {
            return res.status(500).send(error);
        }
    }


    async deleteTweet(req,res) {
        try {
            // validate token and check for user
            const data = JSON.parse(req.params.data);
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
                return res.send();
            }
            return res.status(418).send();
        } catch(error) {
            return res.status(500).sendfile(error);
        }
    }

    // checked
    async like(req,res) {
        try {
            let  data = JSON.parse(req.params.data);
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
            return res.status(404).send();
            
        } catch(error) {
            return res.status(500).send(error);
        }
    }

    // checked
    async retweet(req,res){
        // validate token and check for user
        try {
           let data = req.body;
           const user = await queryUser.getUserById(data);
           if(user) {
            const result = await queryTweet.saveTweet(data);
            const from = data.tweetId;
            data.tweetId = result.insertId;
            await queryHashtag.insertHashTags(data);
            await queryTweet.markRetweeted(data);
            await queryRetweet.makeRetweetLog({fromTweetId:from,tweetId:data.tweetId});
            await queryTweet.increaseCount('tweet_retweet_count',{tweetId:from});
            await queryUser.increaseCount('user_tweet_count',data);
            return res.send();
           }
           return res.status(418).send();
        } catch(error) {
           res.status(500).send(error);
       }
    }
}

module.exports = TweetController;