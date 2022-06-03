const meController = require('../app/controllers/MeController');
const express = require('express');
const router = express.Router();
const auth = require('../config/middleware/auth');

router.get('/playlist/:id/api', auth.checkAuthenticated, meController.playlistApi);
router.get('/playlist/:id', auth.checkAuthenticated, meController.playlist);
router.get('/library', auth.checkAuthenticated, meController.library);

module.exports = router;