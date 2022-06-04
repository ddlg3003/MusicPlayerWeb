const siteRouter = require('./site');
const songRouter = require('./song');
const meRouter = require('./me');
const playlistRouter = require('./playlist');
const authRouter = require('./authentication');
const genreRouter = require('./genre');
const userRouter = require('./user');

function route(app) {
    app.use('/user', userRouter);
    app.use('/genre', genreRouter);
    app.use('/auth', authRouter);
    app.use('/playlist', playlistRouter);
    app.use('/me', meRouter);
    app.use('/song', songRouter);
    app.use('/', siteRouter);
}

module.exports = route;