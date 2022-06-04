const Song = require('../models/Song');
const Genre = require('../models/Genre');

const {
    multipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');

class SiteController {
    show(req, res, next) {
        if(req.isAuthenticated()) {
            if(req.user.role == 'admin') {
                Song.find() 
                    .then((songs) => {
                        Genre.find()
                            .then(genres => {
                                songs = multipleMongooseToObject(songs);
                                genres =multipleMongooseToObject(genres);

                                res.render('songs/list', {
                                    user: mongooseToObject(req.user),
                                    songs,
                                    genres,
                                })
                            })
                            .catch(next);
                    }) 
            }
            else if(req.user.role === 'user') {
                Song.find({ isDeleted: false }) 
                .then((songs) => {
                    songs = multipleMongooseToObject(songs);
                    res.render('home', {
                        user: mongooseToObject(req.user),
                        songs,
                    })
                }) 
                .catch(next);
            }
        }
        else {
            Song.find({ isDeleted: false }) 
                .then((songs) => {
                    songs = multipleMongooseToObject(songs);
                    res.render('home', {
                        songs,
                    })
                }) 
                .catch(next);
        }
    }
}

module.exports = new SiteController();