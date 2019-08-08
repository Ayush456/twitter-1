const queryComment = require('../biz/queryComment');
const queryTweet = require('../biz/queryTweet');
const { validationResult } = require('express-validator');
class CommentController {
    
    // checked
    async queryComment(req,res) {
        dataOperation.addToResponse(res);
        try {
            const data = { tweetId : req.params.tweetId};
            const tweet = await queryTweet.getTweetById(data); 
            if(tweet) {
              const result = await queryComment.commentsByTweetId(data);
              return res.send(result);
            }
            return res.status(418).send(); 
        } catch(error) {
            return res.status(500).send(error);
        }
    }
    
    //checked
    async saveComment(req,res) {
        dataOperation.addToResponse(res);
        try {
            // if token is not expire or exist.

            dataOperation.validateRequest(req,validationResult);
            

            const data = req.body;
            const tweet = await queryTweet.getTweetById(data);
            if(tweet) {
                await queryComment.saveComment(data);
                await queryTweet.increaseCount('tweet_comment_count',data);
                return res.send();
            }
            return res.status(418).send();
        } catch(error) {
            res.status(500).send(error);
        }
    }
    
    //checked
    async updateComment(req,res) {
        dataOperation.addToResponse(res);    
        try {
        // if token is not expire or exist.
        dataOperation.validateRequest(req,validationResult);

        const data = req.body;
        const tweet = await queryTweet.getTweetById(data);
        if(tweet) {
            await queryComment.updateComment(data);
            return res.send();
        }
        return res.status(418).send();
        } catch(error) {
            res.status(500).sendfile(error);
        }
    }

    //checked
    async deleteComment(req,res) {
        dataOperation.addToResponse(res);
        try {
            // if token is not expire or exist.
            dataOperation.validateRequest(req,validationResult);

            const data = req.body;
            const tweet = await queryTweet.getTweetById(data);
            if(tweet) {
                await queryComment.deleteComment(req.body);
                await queryTweet.decreaseCount('tweet_comment_count',req.body);
                return res.send();
            }
            return res.status(418).send();
        } catch(error) {
            res.status(500).send(error);
        }
    }
}

module.exports = CommentController;