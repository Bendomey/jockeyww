exports.index = (req, res) => {
    res.render('Client/index', {
        title: 'Welcome'
    });
}

exports.about = (req, res) => {
    res.render('Client/about', {
        title: 'About Us'
    });
}

exports.contact = (req, res) => {
    res.render('Client/contact', {
        title: 'Contact Us'
    });
}

exports.dj = (req, res) => {
    res.render('Client/dj', {
        title: 'Djs'
    });
}

exports.event = (req, res) => {
    res.render('Client/event', {
        title: 'Events'
    });
}