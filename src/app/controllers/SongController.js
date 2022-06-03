const Song = require('../models/Song');
const Playlist = require('../models/Playlist');
const {
    multipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');

class SongController {
    // [GET] /song/:id
    detail(req, res, next) {
        Song.findOne({_id: req.params.id})
            .then(song => {
                Playlist.find()
                    .then(playlists => {
                        playlists = multipleMongooseToObject(playlists);
                        res.render('songs/detail', {
                            song: mongooseToObject(song),
                            playlists,
                        })
                    })
                    .catch(next);
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
}

module.exports = new SongController();