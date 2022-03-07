const path = require('path');
const multer  = require('multer');
const credentials = require('../../.credentials.development.json');

const PUBLIC_PATH = path.resolve(__dirname, '../../public');

// Config upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destPath = `${PUBLIC_PATH}/images/upload`;
        cb(null, destPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filePath = `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
        cb(null, filePath);
    }
  })
const LOCAL_UPLOAD = multer({ storage });

module.exports = {
    PUBLIC_PATH,
    LOCAL_UPLOAD,
    credentials
}

