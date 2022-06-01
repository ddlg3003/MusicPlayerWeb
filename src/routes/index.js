const siteRouter = require('./site');
const songRouter = require('./song');

function route(app) {
    app.use('/songs', songRouter);
    app.use('/', siteRouter);
}

module.exports = route;