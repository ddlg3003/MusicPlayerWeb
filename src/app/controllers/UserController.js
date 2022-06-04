const User = require('../models/User');

const {
    multipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');

class UserController {
    // [GET] /user/lists
    listUser(req, res, next) {
        User.find({ role: 'user' })
            .then(users => {
                users = multipleMongooseToObject(users);
                res.render('user/list', {
                    user: mongooseToObject(req.user),
                    users,
                })
            })
            .catch(next);
    }
}

module.exports = new UserController();