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

exports.login_redirect = (req, res) => {
    let path = req.session.redirect_to;
    delete req.session.redirect_to;
    res.redirect(path || '/dashboard');
}

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/users/login');
}