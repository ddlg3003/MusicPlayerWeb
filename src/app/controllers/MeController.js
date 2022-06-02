const Playlist = require('../models/Playlist');
const Song = require('../models/Song');

const {
    multipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');

class MeController {
    // [GET] /me/library
    library(req, res, next) {
        res.render('me/library');
    }

    // [GET] /playlist/:id
    playlist(req, res, next) {
        Playlist.findOne({_id: req.params.id})
            .then(playlist => {
                playlist = mongooseToObject(playlist);
                res.render('me/playlist', {playlist});
            })
            .catch(next);
    }

    // [GET] /playlist/:id/api
    playlistApi(req, res, next) {
        Playlist.findOne({_id: req.params.id})
        .then(playlist => {
            Song.find({name: playlist.content})
                .then(songs => {
                    res.json(songs);
                })
        })
        .catch(next);
    }
}

module.exports = new MeController();