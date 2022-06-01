const meController = require('../app/controllers/MeController');
const express = require('express');
const router = express.Router();

router.get('/playlist/:id/api',meController.playlistApi);
router.get('/playlist/:id',meController.playlist);
router.get('/library', meController.library);

module.exports = router;