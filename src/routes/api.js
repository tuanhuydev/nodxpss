const express = require("express");
const { LOCAL_UPLOAD } = require('../configs/constants');
const labController = require('../controllers/labController');

const router = express.Router();

// Upload
router.post('/upload', LOCAL_UPLOAD.single('photo'), labController.uploadProcess);

module.exports = router;