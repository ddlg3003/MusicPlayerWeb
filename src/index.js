// require handlebars {engine}
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const { engine } = require('express-handlebars');
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const db = require('./config/db');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const flash = require('express-flash');

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 36000000,
        },
    }),
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Connect sau khi import từ db/index.js
db.connect();

// require routes folder
const route = require('./routes');

// Read public dir
app.use(express.static(path.join(__dirname, '/public')));

// Use qs to parse the query string to object
// Use body-parser to parse form data
// Middleware saves "form" data
app.use(
    express.urlencoded({
        extended: true,
    }),
);

// Save js codes (fetch, XML,...)
app.use(express.json());

// Template engine
app.engine(
    'hbs',
    engine({
        // Rut gon duoi file
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            // Helper functions giup so sanh
            ifeq: (a, b, opts) => {
                if (a === b) return opts.fn(this);
                else return opts.inverse(this);
            },
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Http logger
app.use(morgan('combined'));

//  Routes init --> routes/index.js --> home.js --> homeController.js
route(app);

app.use(methodOverride('_method'));

// Listen the port
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
