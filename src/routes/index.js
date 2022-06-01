const siteRouter = require('./site');
const songRouter = require('./song');
const meRouter = require('./me');

function route(app) {
    app.use('/me', meRouter);
    app.use('/songs', songRouter);
    app.use('/', siteRouter);
}

module.exports = route;