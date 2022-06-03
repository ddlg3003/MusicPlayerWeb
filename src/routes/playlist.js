const playlistController = require('../app/controllers/PlaylistController');
const express = require('express');
const router = express.Router();
const auth = require('../config/middleware/auth');

router.post('/done', auth.checkAuthenticated, playlistController.add);
router.get('/api', playlistController.playlistApi);
router.delete('/:id', auth.checkAuthenticated, playlistController.delete);

module.exports = router;

