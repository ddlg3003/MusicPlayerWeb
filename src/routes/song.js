const songController = require('../app/controllers/SongController');
const express = require('express');
const router = express.Router();

router.get('/:id', songController.detail);

module.exports = router;    