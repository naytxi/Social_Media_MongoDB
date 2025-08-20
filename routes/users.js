const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const auth = require('../middlewares/auth');

router.post('/', UserController.register);
router.post('/login', UserController.login);
router.get('/search', UserController.findByName);

router.get('/me', auth, UserController.getProfile);
router.post('/logout', UserController.logout);

router.get('/:id', UserController.findById);

module.exports = router;
