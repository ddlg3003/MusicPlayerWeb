const Song = require('../models/Song');
const Playlist = require('../models/Playlist');
const Genre = require('../models/Genre');

const {
    multipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');

class SongController {
    // [GET] /song/:id
    detail(req, res, next) {
        Song.findOne({_id: req.params.id })
            .then(song => {
                if (req.isAuthenticated()) {
                    if (req.user.role === 'user') {
                        Playlist.find({ _userid: req.user._id })
                        .then(playlists => {
                            playlists = multipleMongooseToObject(playlists);
                                res.render('songs/detail', {
                                    song: mongooseToObject(song),
                                    playlists,
                                    user: mongooseToObject(req.user),
                                })
                        })
                        .catch(next);
                    }
                    else res.redirect('/');
                }
                else
                    res.render('songs/detail', {
                        song: mongooseToObject(song),
                    })
            })
            .catch(next);
    }
    // [PUT] /song/:id/:listid/add
    addSongtoList(req, res) {
        Playlist.updateOne(
            {_id: req.params.listid },
            { $addToSet: { content: req.params.id } })
            .then(() => res.json({"": ""}))
            .catch() 
    }

    // [GET] /song/lists
    getAllSong(req, res, next) {
        Song.find()
        .then(songs => {
            Genre.find()
                .then((genres) => {
                    console.log(genres)
                    genres = multipleMongooseToObject(genres);
                    songs = multipleMongooseToObject(songs);
                    if (req.isAuthenticated()) {
                        res.render('songs/list', {
                            songs,
                            genres,
                            user: mongooseToObject(req.user),
                        });
                    }
                })
                .catch(next);
        })
        .catch(next);
    }

    // [GET] /song/add
    getAdd(req, res, next) {
        Genre.find()
            .then(genres => {
                genres = multipleMongooseToObject(genres);
                res.render('songs/add', {
                    genres,
                    user: mongooseToObject(req.user),
                })
            })
            .catch(next);
    }

    // [POST] /song/created
    create(req, res, next) {
        const formData = req.body;
        const song = new Song(formData);
        song
            .save()
            .then(() => {
                res.redirect('/');
            })
            .catch(() => {});
    }

    // [GET] /song/:id/edit
    edit(req, res, next) {
        Song.findById(req.params.id)
            .then(song => {
                Genre.find()
                    .then((genres => {
                        genres = multipleMongooseToObject(genres);
                        res.render('songs/edit', {
                            genres,
                            song: mongooseToObject(song),
                            user: mongooseToObject(req.user),
                        })
                    }))
            })
            .catch(next);
    }

    // [PUT] /song/:id
    update(req, res, next) {
        Song.updateOne({_id: req.params.id }, req.body)
            .then(() => {
                res.redirect('/');
            })
            .catch(next);
    }

    // [PUT] /song/:id/deleted
    delete(req, res, next) {
        Song.updateOne({ _id: req.params.id }, { isDeleted: true })
            .then(() => {
                res.redirect('/');
            })
            .catch(next);
    }

    // [PUT] /song/:id/re-add
    reAdd(req, res, next) {
        Song.updateOne({ _id: req.params.id }, { isDeleted: false })
            .then(() => {
                res.redirect('/');
            })
            .catch(next);
    }

    // [DELETE] /song/:id/true-deleted
    destroy(req, res, next) {
        Song.deleteOne({ _id: req.params.id })
        .then(() => {
            res.redirect('/');
        })
        .catch(next);
    }
}

module.exports = new SongController();