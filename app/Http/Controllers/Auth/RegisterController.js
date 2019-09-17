const passport = require('passport');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const mongoose = require('mongoose');
//models
const User = mongoose.model('User');
// const User = require('../../../Models/User')


exports.index = (req, res) => {
    res.render('Auth/register', {
        title: 'Register'
    });
}

exports.validate_user = (req, res, next) => {
    const { name, email, contact, password, password2 } = req.body;

    req.sanitizeBody('name');
    req.checkBody('name', 'Name field cannot be empty').notEmpty();
    req.checkBody('email', 'Email field cannot be empty').notEmpty();
    req.checkBody('contact', 'Contact field cannot be empty').notEmpty();
    req.checkBody('email', 'Email is invalid').isEmail();
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: true,
        remove_extension: true,
        gmail_remove_subaddress: true
    });
    req.checkBody('password', 'Password field cannot be empty').notEmpty();
    req.checkBody('password2', 'Confirm password field cannot be empty').notEmpty();
    req.checkBody('password2', 'Oops, your passwords do not match').equals(password);
    req.checkBody('password', 'Password must have characters of 6 or more').isLength({ min: 6 });
    let errors = req.validationErrors();
    if (errors) {
        res.render('Auth/register', {
            errors,
            title: 'Register'
        });
    }
    next();
}

exports.register = (req, res, next) => {
    const { name, email, contact, password, password2 } = req.body;
    User.findOne({
            email
        })
        .then(user => {
            if (user != null) {
                let errors = [];
                errors.push({
                    msg: 'Email already exists'
                });
                res.render('auth/register', {
                    errors,
                    title: 'Register'
                });
                return next(null);
            } else {
                User.create({ name, email, contact, password }).then(user => {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(user.password, salt, (err, hash) => {
                            if (err) throw err
                            user
                                .update({ password: hash })
                                .then(() => {
                                    req.flash('success_msg', 'You are now registered and can login');
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err));
                        });
                    });
                });
            }
        });
}