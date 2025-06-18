const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const auth = require('../middlewares/auth');

router.post('/', UserController.register);
router.post('/login', UserController.login);
router.get('/me', auth, UserController.getProfile);
router.post('/logout', UserController.logout);

module.exports = router