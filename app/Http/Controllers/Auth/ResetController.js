const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

//models
const User = mongoose.model('User');


exports.index = (req, res) => {
    res.render('Auth/forgot_password', {
        title: 'Forgot Password'
    });
}

exports.forgot = async(req, res) => {
    //find User
    let user = await User.findOne({
        email: req.body.email
    });
    if (!user) {
        req.flash('success_msg', 'A password reset has been sent successfully');
        return res.redirect('/users/login');
    }
    //set reset password token
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 3600000; //one hour validaity
    await user.save();
    //send email to user
    const resetURL = `http://${req.headers.host}/users/reset_password/${user.resetPasswordToken}`;
    // await mail.send({
    //     user,
    //     subject:'Password Reset Link - JockeyWW',
    //     resetURL,
    //     fileName:'email'
    // });
    req.flash('success_msg', `You have been mailed a password reset link ${resetURL}`);
    res.redirect('/users/login');
}

exports.reset = async(req, res) => {
    let user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {
            $gt: Date.now()
        }
    });

    if (!user) {
        req.flash('error_msg', 'Password reset token is invalid or has expired');
        return res.redirect('/users/login');
    }

    res.render('Auth/reset_password', {
        title: 'Reset Account'
    });
}

exports.confirmedPasswords = (req, res, next) => {
    req.checkBody('password', 'New password field is empty').notEmpty();
    req.checkBody('password2', 'Confirm password field is empty').notEmpty();
    req.checkBody('password2', 'Oops, your passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();
    if (errors) {
        req.flash('error_msg', errors.map(err => err.msg));
        res.redirect('back');
        return;
    }

    next();
}

exports.update = (req, res) => {
    User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: {
                $gt: Date.now()
            }
        })
        .then(user => {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            user.password = req.body.password;
            user.updated_at = Date.now();
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(user.password, salt, (err, hash) => {
                    if (err) throw err;
                    user.password = hash;
                    user.save()
                        .then(user => {
                            req.flash('success_msg', 'Your password has been reset successfully');
                            return res.redirect('/users/login');
                        });
                });
            });
        })
        .catch(err => {
            req.flash('error_msg', 'Password reset token has expired');
        });
}