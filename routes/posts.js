const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const auth = require('../middlewares/auth');

router.get('/', PostController.getAll);
router.get('/search', PostController.searchByTitle);

router.get('/mine', auth, PostController.getMyPosts); // <- MOVER ARRIBA
router.get('/:id', PostController.getById);
router.post('/', auth, PostController.create);
router.put('/:id', auth, PostController.update);
router.delete('/:id', auth, PostController.delete);
router.post('/:id/like', auth, PostController.like);
router.post('/:id/unlike', auth, PostController.unlike);

module.exports = router;
