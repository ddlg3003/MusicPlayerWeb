const Playlist = require('../models/Playlist');
const Song = require('../models/Song');

const {
    multipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');

class MeController {
    // [GET] /me/library
    library(req, res, next) {
        Playlist.find({ _userid: req.user._id })
            .then((playlists) => {
                playlists = multipleMongooseToObject(playlists);
                if(req.isAuthenticated()) {
                    res.render('me/library', { 
                       playlists,
                       user: mongooseToObject(req.user),
                    });
                }
                else
                    res.render('me/library', { playlists });
            })
            .catch(next);
    }

    // [GET] /playlist/:id
    playlist(req, res, next) {
        Playlist.findOne({_id: req.params.id })
            .then(playlist => {
                playlist = mongooseToObject(playlist);
                if(req.isAuthenticated()) {
                    res.render('me/playlist', {
                        playlist,
                        user: mongooseToObject(req.user),
                    });
                }
                else
                    res.render('me/playlist', {playlist});
            })
            .catch(next);
    }

    // [GET] /playlist/:id/api
    playlistApi(req, res, next) {
        Playlist.findOne({_id: req.params.id})
        .then(playlist => {
            Song.find({ _id: playlist.content, isDeleted: false })
                .then(songs => {
                    res.json(songs);
                })
        })
        .catch(next);
    }
}

module.exports = new MeController();