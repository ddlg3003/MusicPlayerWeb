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
        Playlist.find()
            .then((playlists) => {
                res.json({playlists});
            })
            .catch(next);
    }
}

module.exports = new PlaylistController();