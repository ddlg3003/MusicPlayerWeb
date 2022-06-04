const GenreController = require('../app/controllers/GenreController');
const express = require('express');
const router = express.Router();
const auth = require('../config/middleware/auth');
const {
    isAdminLogin,
    isUserLogin,
} = require('../config/middleware/passport');

router.post('/created', auth.checkAuthenticated, isAdminLogin, GenreController.create);
router.get('/add', auth.checkAuthenticated, isAdminLogin, GenreController.getAdd);
router.get('/:id/edit', auth.checkAuthenticated, isAdminLogin, GenreController.edit);
router.post('/:id/delete', auth.checkAuthenticated, isAdminLogin, GenreController.destroy);
router.post('/:id', auth.checkAuthenticated, isAdminLogin, GenreController.update); 
router.post('/:songid/:id/delete', auth.checkAuthenticated, isAdminLogin, GenreController.removeSong);
router.post('/:songid/:id/add', auth.checkAuthenticated, isAdminLogin, GenreController.addSongToGenre);
router.get('/lists', auth.checkAuthenticated, isAdminLogin, GenreController.listGenre);

module.exports = router;