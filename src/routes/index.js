const siteRouter = require('./site');
const songRouter = require('./song');
const meRouter = require('./me');
const playlistRouter = require('./playlist');

function route(app) {
    app.use('/playlist', playlistRouter);
    app.use('/me', meRouter);
    app.use('/song', songRouter);
    app.use('/', siteRouter);
}

module.exports = route;