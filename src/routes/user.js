const userController = require('../app/controllers/UserController');
const express = require('express');
const router = express.Router();
const auth = require('../config/middleware/auth');
const {
    isAdminLogin,
    isUserLogin,
} = require('../config/middleware/passport');

router.get('/lists', auth.checkAuthenticated, isAdminLogin, userController.listUser);

module.exports = router;