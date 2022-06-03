// Middleware
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../app/models/User');
const bcrypt = require('bcrypt');

function initializePassportLogin(passport) {
    passport.use(
        new LocalStrategy(function (username, password, done) {
            User.findOne({ username: username }, async function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        message: 'Username không tồn tại!',
                    });
                }
                if (!(await bcrypt.compare(password, user.password))) {
                    return done(null, false, { message: 'Sai mật khẩu!' });
                }
                return done(null, user);
            });
        }),
    );

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });
}

async function checkRegisterUsername(req, res, next) {
    // Have at least 6 characters can include digit, character and uppercase
    const validUsername = /^[0-9a-zA-Z]{6,}$/;
    if (!req.body.username.match(validUsername)) {
        await req.flash('error', 'Username không đúng định dạng!');
        res.redirect('/auth/register');
    } else {
        User.findOne(
            { username: req.body.username },
            async function (err, user) {
                if (err) {
                    // Do sth
                }
                if (!user) {
                    next();
                } else {
                    await req.flash('error', 'Username đã tồn tại!');
                    res.redirect('/auth/register');
                }
            },
        );
    }
}

async function checkRegisterEmail(req, res, next) {
    // The validation is referenced from
    //https://www.w3resource.com/javascript/form/example-javascript-form-validation-email-REC-2822.html?text1=d%40d&submit=Submit#
    const validEmail =
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!req.body.email.match(validEmail)) {
        await req.flash('error', 'Email không đúng định dạng!');
        res.redirect('/auth/register');
    } else {
        User.findOne({ email: req.body.email }, async function (err, user) {
            if (err) {
                // Do sth
            }
            if (!user) {
                next();
            } else {
                await req.flash('error', 'Email đã tồn tại!');
                res.redirect('/auth/register');
            }
        });
    }
}

async function checkPassword(req, res, next) {
    // Must have digit, charater, uppercase character, must have all 3 of em
    // must have special character and length is between 8 - 15
    const validPassword =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (!req.body.password.match(validPassword)) {
        await req.flash('error', 'Mật khẩu không có đủ các điều kiện yêu cầu!');
        res.redirect('/auth/register');
    } else if (req.body.password !== req.body.rePassword) {
        await req.flash('error', 'Mật khẩu nhập lại không khớp!');
        res.redirect('/auth/register');
    } else next();
}

function isAdminLogin(req, res, next) {
    User.findOne({ username: req.user.username }, (err, user) => {
        if (err) res.redirect('/auth/login');
        else if (user.role === 'admin') {
            next();
        } else if (user.role === 'user') {
            res.redirect('/');
        }
    });
}

function isUserLogin(req, res, next) {
    User.findOne({ username: req.user.username }, (err, user) => {
        if (err) res.redirect('/auth/login');
        else if (user.role === 'admin') {
            res.redirect('/');
        } else if (user.role === 'user') {
            next();
        }
    });
}

module.exports = {
    initializePassportLogin,
    checkRegisterUsername,
    checkRegisterEmail,
    checkPassword,
    isAdminLogin,
    isUserLogin,
};