const path = require('path');
const credentials = require('../../.credentials.development.json');

const PUBLIC_PATH = path.resolve(__dirname, '../../public');

const MAIL_USERNAME = 'sidehand.work';
const MAIL_PASSWORD = 'wimMi1-symsav-jitfev';
const MAIL_FROM_ADDRESS = 'sidehand.work@gmail.com';

module.exports = {
    MAIL_USERNAME,
    MAIL_PASSWORD,
    MAIL_FROM_ADDRESS,
    PUBLIC_PATH,
    credentials
}

