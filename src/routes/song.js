const songController = require('../app/controllers/SongController');
const express = require('express');
const router = express.Router();
const auth = require('../config/middleware/auth');
const {
    isAdminLogin,
    isUserLogin,
} = require('../config/middleware/passport');

router.post('/created', auth.checkAuthenticated, isAdminLogin, songController.create);
router.get('/add', auth.checkAuthenticated, isAdminLogin, songController.getAdd)
router.get('/lists', auth.checkAuthenticated, isAdminLogin, songController.getAllSong);
router.get('/:id/edit', auth.checkAuthenticated, isAdminLogin, songController.edit);
router.put('/:id/:listid/add', auth.checkAuthenticated, songController.addSongtoList);
router.post('/:id/true-deleted', auth.checkAuthenticated, isAdminLogin, songController.destroy);
router.post('/:id/deleted', auth.checkAuthenticated, isAdminLogin, songController.delete);
router.post('/:id/re-add', auth.checkAuthenticated, isAdminLogin, songController.reAdd);
router.post('/:id', auth.checkAuthenticated, isAdminLogin, songController.update);
router.get('/:id', songController.detail);

module.exports = router;    