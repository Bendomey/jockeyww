const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//models
const User = mongoose.model('User');

exports.sanitize_profile_body = (req, res, next) => {
    req.sanitizeBody('name');
    req.checkBody('name', 'Name field cannot be empty').notEmpty();
    req.checkBody('email', 'Email field cannot be empty').notEmpty();
    req.checkBody('full_number', 'Contact field cannot be empty').notEmpty();
    req.checkBody('email', 'Email is invalid').isEmail();
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: true,
        remove_extension: true,
        gmail_remove_subaddress: true
    });
    let errors = req.validationErrors();
    if (errors) {
        res.render('Dashboard/Admin/settings', {
            errors,
            title: 'Settings'
        });
    }
    next();
};

exports.update_profile = async(req, res) => {
    const { id, name, email, full_number } = req.body;
    await User.updateOne({ _id: id }, {
        name,
        email,
        contact: full_number,
        updated_at: Date.now()
    });
    req.flash('success_msg', 'Profile Updated successfully');
    res.redirect('back');
}

exports.sanitize_security_body = (req, res, next) => {
    const { password } = req.body;
    req.checkBody('old_password', 'Old Password field cannot be empty').notEmpty();
    req.checkBody('password', 'New Password field cannot be empty').notEmpty();
    req.checkBody('password2', 'Confirm password field cannot be empty').notEmpty();
    req.checkBody('password2', 'Oops, your passwords do not match').equals(password);
    req.checkBody('password', 'New Password must have characters of 6 or more').isLength({ min: 6 });
    let errors = req.validationErrors();
    if (errors) {
        res.render('Dashboard/Admin/settings', {
            errors,
            title: 'Settings'
        });
    }
    next();
};

exports.update_security = async(req, res) => {
    const { id, old_password, password } = req.body;
    let user = await User.findById(id);
    //compare the passwords
    bcrypt.compare(old_password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
            //update by hashing new password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) throw err;
                    user.password = hash;
                    user.updated_at = Date.now()
                    user.save()
                        .then(user => {
                            req.flash('success_msg', 'Password updated successfully');
                            res.redirect('back');
                        });
                });
            });
        } else {
            req.flash('error_msg', 'Old password is incorrect');
            return res.redirect('back');
        }
    });
};