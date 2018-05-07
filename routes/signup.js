const route = require('express').Router();
const { User } = require('../db/model');
const pass2hash = require('../password').pass2hash

route.get('/', (req, res) => {
    res.render('signup')
});

route.post('/', (req, res) => {
    pass2hash(req.body.password)
    .then((hash) => {
        User.create({
            username: req.body.username,
            password: hash,
        })
        .then((newuser) => {
            res.redirect('/dashboard')
        })
        .catch((err) => {
            res.send(err.message)
        })
    })
    .catch((err) => { res.send(err.message) })
});

module.exports = route