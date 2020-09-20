const express = require('express');
const router = express.Router();
const {getUser} = require('../controllers/auth/getUser');
const auth = require('../middleware/jwtauth');


router.route('/').get(auth, getUser);

module.exports = router;
