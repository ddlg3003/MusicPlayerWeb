const playlistController = require('../app/controllers/PlaylistController');
const express = require('express');
const router = express.Router();
const auth = require('../config/middleware/auth');

router.get('/:name/api', playlistController.genrePlaylistApi);
router.get('/:name', playlistController.genrePlaylist);
router.post('/done', auth.checkAuthenticated, playlistController.add);
router.get('/api', playlistController.playlistApi);
router.delete('/:id', auth.checkAuthenticated, playlistController.delete);

module.exports = router;

