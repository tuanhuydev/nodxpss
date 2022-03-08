const nodemailer = require('nodemailer');
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

const { MAIL_USERNAME, MAIL_PASSWORD } = require('../configs/constants');

exports.mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: MAIL_USERNAME,
        pass: MAIL_PASSWORD
    }
});