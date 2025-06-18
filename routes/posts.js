const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const auth = require('../middlewares/auth');

router.post('/', auth, PostController.create);

module.exports = router;