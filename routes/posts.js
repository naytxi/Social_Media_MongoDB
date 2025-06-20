const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const auth = require('../middlewares/auth');

router.post('/', auth, PostController.create);
router.put('/:id', auth, PostController.update);
router.delete('/:id', auth, PostController.delete);
router.get('/', PostController.getAll);
router.get('/:id', PostController.getById);

module.exports = router;