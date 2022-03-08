const multer  = require('multer');
const path = require('path');
const { PUBLIC_PATH } = require('../configs/constants');

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
});

exports.LOCAL_UPLOAD = multer({ storage });