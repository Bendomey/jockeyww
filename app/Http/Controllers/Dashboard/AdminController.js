const mongoose = require('mongoose');

//models
const User = mongoose.model('User');

exports.index = async(req, res) => {
    let djCount = User.countDocuments({
        isAdmin: '0'
    });
    let [dj] = await Promise.all([djCount]);
    res.render('Dashboard/Admin/index', {
        title: "Dashboard",
        dj
    });
};

exports.settings = (req, res) => {
    res.render('Dashboard/Admin/settings', {
        title: 'Setting'
    });
};