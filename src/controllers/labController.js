const { mailTransporter } = require('../services/emailService');
const { MAIL_FROM_ADDRESS } = require('../configs/constants');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const {google} = require('googleapis');
const res = require('express/lib/response');

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

exports.authGoogle = (req, res) => {
    const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];
    const TOKEN_PATH = 'token.json';

    fs.readFile(path.resolve(__dirname, '../../client_secret.json'), (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        authorize(JSON.parse(content), this.sendEmail(req,res));
    });

    function authorize(credentials, callback) {
        const {client_secret, client_id, redirect_uris} = credentials.web;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);
    
        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, (err, token) => {
            if (err) return getNewToken(oAuth2Client, callback);
            oAuth2Client.setCredentials(JSON.parse(token));
            callback(oAuth2Client);
        });
        }
    
        /**
         * Get and store new token after prompting for user authorization, and then
         * execute the given callback with the authorized OAuth2 client.
         * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
         * @param {getEventsCallback} callback The callback for the authorized client.
         */
        function getNewToken(oAuth2Client, callback) {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });
        // TODO: Change this one
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question('Enter the code from that page here: ', (code) => {
            rl.close();
            oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
            });
        });
        }

}

exports.sendEmail = (req, res) => (auth) => {
    const gmail = google.gmail({version: 'v1', auth});
    var email_lines = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
        "MIME-Version: 1.0\n",
        "Content-Transfer-Encoding: 7bit\n",
        "to: ", "lmjcvm@gmail.com", "\n",
        "from: ", "tuanhuydev@gmail.com", "\n",
        "subject: ", "This is a test 1", "\n\n",
        "This is the first message. We make it"
    ].join('');
    var test = Buffer.from(email_lines).toString('base64')
    gmail.users.messages.send({
        userId: 'me' ,
        requestBody: {
           raw: test
        }
    }, {}, () => {
        res.end('Sent email');
    });
}

exports.verifyEmail = (req, res) => {
    res.send({ result: 'success' });
}

exports.console = (req, res) => {
    res.send('Check your console');
    require('../services/terminalService');
}