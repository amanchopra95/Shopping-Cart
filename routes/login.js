const route = require('express').Router();
const passport = require('passport');

route.get('/', (req, res) => {
    res.render('login')
});

route.post('/', 
    passport.authenticate(
        'local',
        {failureRedirect: '/login'}), 
    (req, res) => {
        res.redirect('dashboard');
    }
);

module.exports = route