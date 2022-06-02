const playlistController = require('../app/controllers/PlaylistController');
const express = require('express');
const router = express.Router();

router.post('/done', playlistController.add);
router.get('/api', playlistController.playlistApi);
router.delete('/:id', playlistController.delete);

module.exports = router;

