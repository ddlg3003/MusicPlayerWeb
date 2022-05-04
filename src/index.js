// Import libraries
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const route = require('./routes');
const db = require('./config/db');

// Use public files
app.use(express.static(path.join(__dirname, '/public')));

// Connect db
db.connect();

app.use(
    express.urlencoded({
        extended: true,
    }),
);

// Template engine for html
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
    }),
);

// Routers for apps
route(app);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
