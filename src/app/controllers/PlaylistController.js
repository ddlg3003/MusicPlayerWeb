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
                res.json({playlists});
            })
            .catch(next);
    }

    // [DELETE] /playlist/:id
    delete (req, res, next) {
        Playlist.deleteOne({_id: req.params.id })
            .then(() => res.json({"": ""}))
            .catch(next);
    }
}

module.exports = new PlaylistController();