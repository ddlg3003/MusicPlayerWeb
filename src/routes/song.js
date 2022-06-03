const songController = require('../app/controllers/SongController');
const express = require('express');
const router = express.Router();
const auth = require('../config/middleware/auth');

router.put('/:id/:listid/add', auth.checkAuthenticated, songController.addSongtoList);
router.get('/:id', songController.detail);

module.exports = router;    