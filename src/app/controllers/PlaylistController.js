const Playlist = require('../models/Playlist');
const Song = require('../models/Song');

const {
    multipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');

class PlaylistController {
    // [POST] /playlist/done
    add(req, res, next) {
        const formData = req.body;
        Object.assign(formData, { _userid: req.user._id });
        console.log(formData);
        const playlist = new Playlist(formData);
        playlist.save()
            .then(() => {
                res.json({"": ""});
            })
            .catch(() => {});
    }

    // [GET] /playlist/api
    playlistApi(req, res, next) {
        Playlist.find({ _userid: req.user._id })
            .then((playlists) => {
                res.json({ playlists });;
            })
            .catch(next);
    }

    // [DELETE] /playlist/:id
    delete (req, res, next) {
        Playlist.deleteOne({_id: req.params.id })
            .then(() => res.json({"": ""}))
            .catch(next);
    }

    // [GET] /playlist/:name/api
    genrePlaylistApi(req, res, next) {
        const permission = false;
        Song.find({ genre: req.params.name })
            .then(songs => res.json({ songs, permission }))
            .catch(next);
    }

    // [GET] /playlist/:name
    genrePlaylist(req, res, next) {
        Song.find({ name: req.params.name })
            .then(songs => {
                songs = multipleMongooseToObject(songs);   
                if (req.isAuthenticated()) {
                    if(req.user.role == 'admin') {
                        res.redirect('/');
                    }
                    else if(req.user.role == 'user') {
                        res.render('me/playlist', {
                            songs,
                            playlist: {
                                name: req.params.name,
                            },
                            user: mongooseToObject(req.user),
                        });
                    }
                }
                else 
                    res.render('me/playlist', {
                        songs,
                        playlist: {
                            name: req.params.name,
                        }
                    }); 

            })
            .catch(next);
    }

    // [PUT] /playlist/:id/:songid/remove
    removeSong(req, res, next) {
        Playlist.updateOne(
            { _id: req.params.id },
            { $pull: { content: req.params.songid }})
            .then(() => res.json({"": ""}))
            .catch(next) 
    }
}

module.exports = new PlaylistController();