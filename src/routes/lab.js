const express = require("express");
const labController = require('../controllers/labController');
const { withMonster } = require('../middlewares/withMonster');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/lab');
});

// Handle Form
router.get('/form', labController.form);
router.post('/form/process', labController.formProcess);
router.get('/form/thank-you', labController.formThankYou);


// Upload
router.get('/upload', labController.upload);

// Cookie
router.get('/test-cookie', labController.testCookie);
router.get('/verify-cookie', withMonster,labController.verifyCookie);

// Send email
router.get('/send-email', labController.authGoogle);

router.get('/verify-email', labController.verifyEmail)

module.exports = router;