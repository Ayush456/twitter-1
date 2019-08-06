const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/comment.controller.js');
const comment = new CommentController();

router.get('/:data',comment.queryComment);          //{tweetId}

router.delete('/:data',comment.deleteComment);      //{tweetId,userId}

router.post('/',comment.saveComment);               //{tweetId,userId,textMsg}

router.put('/',comment.updateComment);              //{tweetId,userId,textMsg}

router.get('*', (req, res) => res.status(404).send());

module.exports = router;



