const express = require('express');
const session = require('express-session');
const passport = require('./passport/mypassport');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret: "This is a secret which you should not share.",
    saveUninitialized: true,
    resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'hbs');

//Static Files
app.use('/', express.static(path.join(__dirname, '/public')));

//Routes
app.use('/products', require('./routes/product'));
app.use('/login', require('./routes/login'));
app.use('/signup', require('./routes/signup'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/admin', require('./routes/admin'))
app.use('/cart', require('./routes/cart'));
app.use('/logout', require('./routes/logout'));

module.exports = app
