const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const { User } = require('./db/model');

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
        if(user.password !== password){
            return done(null, false);
        }

        return done(null, user);
    }).catch((err) => done(err))
}))

module.exports = passport