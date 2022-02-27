const express = require("express");
const labController = require('../controllers/labController');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/lab');
});

// Handle Form
router.get('/form', labController.form)
router.post('/form/process', labController.formProcess)
router.get('/form/thank-you', labController.formThankYou)


// Upload
router.get('/upload', labController.upload)

module.exports = router;