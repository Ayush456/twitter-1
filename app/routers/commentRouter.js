const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/comment.controller.js');
const comment = new CommentController();
const commentValidator = require('../validators/comment.validator');
const utils = require('../biz/utils');

router.get('/:tweetId',utils.verifyToken,comment.queryComment);          //{tweetId}

router.delete('/',utils.verifyToken,commentValidator.validate('deleteComment'),comment.deleteComment);      //{tweetId,userId}

router.post('/',utils.verifyToken,commentValidator.validate('saveComment'),comment.saveComment);               //{tweetId,userId,textMsg}

router.put('/',utils.verifyToken,commentValidator.validate('updateComment'),comment.updateComment);              //{tweetId,userId,textMsg}

router.get('*', (req, res) => res.status(404).send());

module.exports = router;



																															