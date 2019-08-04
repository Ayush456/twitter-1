const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/comment.controller.js');
const comment = new CommentController();

//router.get('/:userId',comment.queryComment);

router.delete('/',comment.deleteComment);

router.post('/',comment.saveComment);

router.put('/',comment.updateComment);

router.get('*', (req, res) => res.status(404).send());

module.exports = router;

// get = fetch data
// post = send data
// delete = delete data
// put = update data

// /
// /insert
// /update
// /delete
// /\*



