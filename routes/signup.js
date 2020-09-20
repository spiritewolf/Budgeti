const express = require('express');
const router = express.Router();
const {signup} = require('../controllers/auth/signup');

router.route('/signup').post(signup);

module.exports = router;
