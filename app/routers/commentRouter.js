const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/comment.controller.js');
const comment = new CommentController();
const commentValidator = require('../validators/comment.validator');

router.get('/:tweeetId',comment.queryComment);          //{tweetId}

router.delete('/',commentValidator.validate('deleteComment'),comment.deleteComment);      //{tweetId,userId}

router.post('/',commentValidator.validate('saveComment'),comment.saveComment);               //{tweetId,userId,textMsg}

router.put('/',commentValidator.validate('updateComment'),comment.updateComment);              //{tweetId,userId,textMsg}

router.get('*', (req, res) => res.status(404).send());

module.exports = router;



