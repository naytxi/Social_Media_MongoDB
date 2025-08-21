const express = require('express');
const router = express.Router({ mergeParams: true });
const CommentController = require('../controllers/CommentsController');
const auth = require('../middlewares/auth');
const isCommentAuthor = require('../middlewares/isCommentAuthor');


router.get('/', CommentController.getCommentsByPost);

router.post('/', auth, CommentController.createComment);

router.delete('/:id', auth, isCommentAuthor, CommentController.deleteComment);

module.exports = router;
