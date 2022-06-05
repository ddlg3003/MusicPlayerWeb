const playlistController = require('../app/controllers/PlaylistController');
const express = require('express');
const router = express.Router();
const auth = require('../config/middleware/auth');
const {
    isAdminLogin,
    isUserLogin,
} = require('../config/middleware/passport');

router.put('/:id/:songid/remove', playlistController.removeSong);
router.post('/done', auth.checkAuthenticated, playlistController.add);
router.get('/api', playlistController.playlistApi);
router.get('/:name/api', playlistController.genrePlaylistApi);
router.get('/:name', playlistController.genrePlaylist);
router.delete('/:id', auth.checkAuthenticated, playlistController.delete);

module.exports = router;

