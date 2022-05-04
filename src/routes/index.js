const siteRouter = require('./site');
const songRouter = require('./song');

function route(app) {
    app.use('/song', songRouter);
    app.use('/', siteRouter);
}

module.exports = route;