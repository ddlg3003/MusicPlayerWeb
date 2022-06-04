const meController = require('../app/controllers/MeController');
const express = require('express');
const router = express.Router();
const auth = require('../config/middleware/auth');
const {
    isAdminLogin,
    isUserLogin,
} = require('../config/middleware/passport');

router.get('/playlist/:id/api', auth.checkAuthenticated, isUserLogin, meController.playlistApi);
router.get('/playlist/:id', auth.checkAuthenticated, isUserLogin, meController.playlist);
router.get('/library', auth.checkAuthenticated, isUserLogin, meController.library);

module.exports = router;