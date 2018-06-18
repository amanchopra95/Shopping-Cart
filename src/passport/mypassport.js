const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const { User } = require('../db/model');
const compare2hash = require('../utils/password').compare2hash

passport.serializeUser( (user, done) => {
    if(!user.id){
        return done(new Error("User has no id."))
    }
    done(null, user.id);
});

passport.deserializeUser( (userId, done) => {
    User.findOne({
        where: {
            id: userId
        }
    }).then((user) => {
        if(!user){
            return done(new Error("User does not exist"))
        }
        done(null, user)
    }).catch((err) => {
        done(err)
    })
});

passport.use(new localStrategy( (username, password, done) => {
    User.findOne({
        where: {
            username: username
        }
    }).then((user) => {
        if(!user){
            return done(null, false);
        }

        compare2hash(password, user.password)
        .then((match) => {
            /**
             * For test users as their password are pure texts.
             */
            if(!match){
                if(password === user.password){
                    return done(null, user)
                }
                return done(null, false)
            }
            return done(null, user)
        })
        .catch((err) => { res.send(err.message) })
    }).catch((err) => done(err))
}))

module.exports = passport