const playlistController = require('../app/controllers/PlaylistController');
const express = require('express');
const router = express.Router();

router.get('/api', playlistController.playlistApi);
router.post('/done', playlistController.add);

module.exports = router;

