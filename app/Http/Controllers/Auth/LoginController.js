exports.index = (req, res) => {
    res.render('Auth/login', {
        title: 'Login'
    });
}

exports.rememberMe = (req, res, next) => {
    if (req.body.remember) {
        req.session.cookie.maxAge = 30 * 24 * 60 * 1000; // Cookie expires after 30 days
    } else {
        req.session.cookie.expires = false; // Cookie expires at end of session
    }
    next();
}

exports.adminRoute = (req, res, next) => {
    console.log(req.user);
    if (req.user.isAdmin == 1) {
        req.session.goTo = '/admin/dashboard';
    } else {
        req.session.goTo = '/dj/dashboard'
    }
    next();
};

exports.login_redirect = (req, res) => {
    let path = req.session.redirect_to;
    let defaultPath = req.session.goTo;
    delete req.session.redirect_to;
    delete req.session.goTo;
    res.redirect(path || defaultPath);
}

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/users/login');
}