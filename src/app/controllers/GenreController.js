const Song = require('../models/Song');
const Genre = require('../models/Genre');

const {
    multipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');

class GenreController {
    // [PUT] /genre/:songid/:id/add
    addSongToGenre(req, res, next) {
        Genre.updateOne({ _id: req.params.id }, 
            { $addToSet: { songs: req.params.songid } })
        .then(() => {
            res.redirect('/');
        })
        .catch(next);
    }

    // PUT /genre/:songid/:id/detete
    removeSong(req, res, next) {
        Genre.updateOne({ _id: req.params.id }, 
            { $pull: { songs: req.params.songid } })
        .then(() => {
            res.redirect('/');
        })
        .catch(next);
    }

    // [GET] /genre/lists
    listGenre(req, res, next) {
        Genre.find()
            .then(genres => {
                genres = multipleMongooseToObject(genres);
                res.render('genre/list', {
                    user: mongooseToObject(req.user),
                    genres,
                })
            })
            .catch(next)
    }

    // [GET] /genre/add
    getAdd(req, res, next) {
        res.render('genre/add', {
            user: mongooseToObject(req.user),
        })
    }
    
    // [POST] /genre/created
    create(req, res, next) {
        const formData = req.body;
        const genre = new Genre(formData);
        genre
            .save()
            .then(() => {
                res.redirect('/genre/lists');
            })
            .catch(() => {});
    }

    // [GET] /genre/:id/edit
    edit(req, res, next) {
        Genre.findById(req.params.id)
        .then(genre => {
            genre = mongooseToObject(genre);
            res.render('genre/edit', {
                genre,
                user: mongooseToObject(req.user),
            })
        })
        .catch(next);
    }

    // [PUT] /genre/:id
    update(req, res, next) {
        Genre.updateOne({ _id: req.params.id }, req.body)
            .then(() => {
                res.redirect('/genre/lists');
            })
            .catch(next);
    }

    // [DELETE] /genre/:id/delete
    destroy(req, res, next) {
        Genre.deleteOne({ _id: req.params.id })
            .then(() => {
                res.redirect('/genre/lists');
            })
            .catch(next);
    }
}

module.exports = new GenreController();