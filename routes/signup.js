const route = require('express').Router();
const { User } = require('../db/model');

route.get('/', (req, res) => {
    res.render('signup')
});

route.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password,
        roles: req.body.role
    })
    .then((newuser) => {
        res.redirect('/login')
    })
    .catch((err) => {
        res.send(err.message)
    })
});

module.exports = route