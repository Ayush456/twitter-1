const queryComment = require('../biz/queryComment');
const queryTweet = require('../biz/queryTweet');

class CommentController {
    
    // checked
    async queryComment(req,res) {
        try {
            const data = JSON.parse(req.params.data);
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
        try {
            // if token is not expire or exist.
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
        try {
        // if token is not expire or exist.
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
        try {
            // if token is not expire or exist.
            const data = JSON.parse(req.params.data);
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