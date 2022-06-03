const songController = require('../app/controllers/SongController');
const express = require('express');
const router = express.Router();

router.put('/:id/:listid/add', songController.addSongtoList);
router.get('/:id', songController.detail);

module.exports = router;    