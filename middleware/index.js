var express = require('express');
var auth = require('./auth');
var router = express.Router();
const imageupload = require('../imagehelper/imageuploader')

//registrasi
router.post('/api/v1/register', imageupload.upload.single('image'), auth.registrasi);

//login
router.post('/api/v1/login', auth.login);

module.exports = router;