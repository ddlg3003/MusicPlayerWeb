const Song = require('../models/Song');
const {
    multipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');

class SiteController {
    show(req, res, next) {
        Song.find()
            .then(songs => {
                songs = multipleMongooseToObject(songs);
                res.render('home', {
                    songs,
                });
            })
            .catch(next);
    }
}

module.exports = new SiteController();