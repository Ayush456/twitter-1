const queryComment = require('../biz/queryComment');
const queryTweet = require('../biz/queryTweet');
const { validationResult } = require('express-validator');
const utils = require('../biz/utils');
class CommentController {
    
    async queryComment(req,res) {
        utils.addToResponse(res);
        try { 
            const data = req.params;
            const tweet = await queryTweet.getTweetById(data); 
            if(tweet) {
              const result = await queryComment.commentsByTweetId(data);
              return res.send(result);
            }
            return res.status(404).send("tweet does not exist"); 
        } catch(error) {
            console.log(error);
            return res.status(500).send("internal server error");
        }
    }
    
    async saveComment(req,res) {
        try {
            res = await utils.addToResponse(res); 
            const errors = validationResult(req);
            if(!errors.isEmpty()) return res.status(422).json({errors : errors.array() });
            const data = req.body;
            const tweet = await queryTweet.getTweetById(data);
            if(tweet) {
                await queryComment.saveComment(data);
                await queryTweet.increaseCount('tweet_comment_count',data);
                return res.send();
            }
            return res.status(404).send("tweet does not exist");
        } catch(error) {
            console.log(error);
            res.status(500).send("internal server error");
        }
    }

    async updateComment(req,res) {    
        try {
        res = await utils.addToResponse(res); 
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(422).json({errors : errors.array() });
        const data = req.body;
        const tweet = await queryTweet.getTweetById(data);
        if(tweet) {
            await queryComment.updateComment(data);
            return res.send();
        }
        return res.status(404).send("tweet does not exist");
        } catch(error) {
            console.log(error);
            res.status(500).sendfile("internal server error");
        }
    }

    async deleteComment(req,res) {
        try {
            res = await utils.addToResponse(res); 
            const errors = validationResult(req);
            if(!errors.isEmpty()) return res.status(422).json({errors : errors.array() });
            const data = req.body;
            const tweet = await queryTweet.getTweetById(data);
            if(tweet) {
                await queryComment.deleteComment(req.body);
                await queryTweet.decreaseCount('tweet_comment_count',req.body);
                return res.send();
            }
            return res.status(404).send("tweet does not exist");
        } catch(error) {
            console.log(error);
            res.status(500).send("internal server error");
        }
    }
}

module.exports = CommentController;