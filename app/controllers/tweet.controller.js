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
            const tweet = await queryTweet.saveTweet(req.body);
            await queryHashtag.insertHashTags({tweetId : tweet.insertId,hashTags : req.body.hashTags});
            await queryUser.increaseCount('user_tweet_count',{userId:req.body.userId});
            res.send();
        } catch(error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

    // checked
    async editTweet(req,res) {
        try {
            // validate token and check for user
            await queryHashtag.deleteHashTags(req.body);
            await queryTweet.updateTweet(req.body);
            await queryHashtag.insertHashTags(req.body);
            await queryLike.deleteLikebyTweetId(req.body);
            res.send();
        } catch(error) {
            res.status(500).send(error);
        }
    }


    async deleteTweet(req,res) {
        try {
            // validate token and check for user
            // will get tweetId and userId
            const data = JSON.parse(req.params.data);
            const result = await queryTweet.getTweet(data);
            if(result.tweet_like_count != 0) await queryLike.deleteLikebyTweetId(data);
            if(result.tweet_comment_count != 0) await queryComment.deleteCommentsByTweetId(data);
            await queryHashtag.deleteHashTags(data);
            if(result._isRetweeted) {
                const from = await queryRetweet.getFromTweet(data);
                if(from) await queryTweet.decreaseCount('tweet_retweet_count',{tweetId:from});
            }
            if(result.tweet_retweet_count != 0) await queryRetweet.deleteRetweetsByTweetId(data);
            await queryTweet.deleteTweet(data);
            await queryUser.decreaseCount('user_tweet_count',data);
            res.send();
        } catch(error) {
            res.status(500).sendfile(error);
        }
    }

    // checked
    async like(req,res) {
        try {
          // validate token and check for user
          let  data = JSON.parse(req.params.data);
          const isLiked = await queryLike.isLiked(data);
          if(isLiked) {
            await queryLike.deleteLike(data);
            await queryTweet.decreaseCount('tweet_like_count',data);
          }
          else {
            await queryLike.insertLike(data);
            await queryTweet.increaseCount('tweet_like_count',data);
          }
          res.send(!isLiked); 
        } catch(error) {
            res.status(500).send(error);
        }
    }

    // checked
    async retweet(req,res){
        // validate token and check for user
        try {
           let data = req.body;
           const result = await queryTweet.saveTweet(data);
           const from = data.tweetId;
           data.tweetId = result.insertId;
           await queryHashtag.insertHashTags(data);
           await queryTweet.markRetweeted(data);
           await queryRetweet.makeRetweetLog({fromTweetId:from,tweetId:data.tweetId});
           await queryTweet.increaseCount('tweet_retweet_count',{tweetId:from});
           await queryUser.increaseCount('user_tweet_count',data);
           res.send();
        } catch(error) {
           res.status(500).send(error);
       }
    }
}

module.exports = TweetController;