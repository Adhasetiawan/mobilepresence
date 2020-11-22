var express = require('express');
var auth = require('./auth');
var router = express.Router();
const imageupload = require('../imagehelper/imageuploader')

router.post('/api/v1/register', imageupload.upload.single('image'), auth.registrasi);

module.exports = router;