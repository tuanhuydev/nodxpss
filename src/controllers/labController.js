exports.form = (req, res) => {
    res.render('pages/lab/form', { csrf: 'CSRF token goes here'});
}

exports.formProcess = (req, res) => {
    console.log('Form (from querystring): ' + req.query.form)
    console.log('CSRF token (from hidden form field): ' + req.body._csrf)
    console.log('Name (from visible form field): ' + req.body.name)
    console.log('Email (from visible form field): ' + req.body.email)
    res.redirect(303, '/lab/form/thank-you')
}

exports.formThankYou = (req, res) => {
    res.end('Thank you');
}

exports.upload = (req, res) => {
    res.render('pages/lab/upload', { csrf: 'CSRF token goes here'})
}

exports.uploadProcess = (req, res) => {
    console.log('files', req.file);
    res.send({ result: 'success' });
}


// Cookie testing
exports.testCookie = (req, res) => {
    req.session.monster = 'gruh';
    res.end('Check your request cookie');
}

exports.verifyCookie = (req, res) => {
    res.send(req.session);
}