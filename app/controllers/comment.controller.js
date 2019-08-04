const queryComment = require('../biz/queryComment');
const queryTweet = require('../biz/queryTweet');

class CommentController {
    
    async saveComment(req,res) {
        try {
            // if token is not expire or exist.
            await queryComment.saveComment(req.body);
            await queryTweet.increaseCount('tweet_comment_count',req.body);
            res.send();
        } catch(error) {
            res.status(500).send(error);
        }
    }
    
    async updateComment(req,res) {
        try {
        // if token is not expire or exist.
        await queryComment.updateComment(req.body);
        res.send();
        } catch(error) {
            res.status(500).send(error);
        }
    }

    //checked
    async deleteComment(req,res) {
        try {
            // if token is not expire or exist.
            await queryComment.deleteComment(req.body);
            await queryTweet.decreaseCount('tweet_comment_count',req.body);
            res.send();
        } catch(error) {
            res.status(500).send(error);
        }
    }
}

module.exports = CommentController;