const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
// const User = mongoose.model('User');
const User = require('../../Models/User');
const LocalStragtegy = require('passport-local').Strategy;

module.exports = function(passport) {
    passport.use(
        new LocalStragtegy({ usernameField: 'email' }, (email, password, done) => {
            //Match User
            User.findOne({
                    email: email
                })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'That email is not registered' });
                    }

                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {

                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Password incorrect' });
                        }
                    });
                }).catch(err => { throw err });
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findByPk(id).then((user) => {

            if (user) {
                done(null, user);
            } else {
                done(err, null);
            }
        });
    });
}