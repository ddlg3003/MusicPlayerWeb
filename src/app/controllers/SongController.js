const Song = require('../models/Song');
// const Playlist = require('../models/Playlist');
const {
    multipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');

class SongController {
    // [GET] /songs/:id
    detail(req, res, next) {
        Song.findOne({_id: req.params.id})
            .then(song => {
                res.render('songs/detail', {
                    song: mongooseToObject(song),
                })
            })
            .catch(next);
    }

    // [GET] /song/add
    add(req, res) {
        
    }
}

module.exports = new SongController();