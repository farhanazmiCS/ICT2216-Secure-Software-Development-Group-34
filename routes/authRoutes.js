const express = require('express');
const router = express.Router();
const csrfProtection = require('../middleware/csrfProtection');

const { register, login, logout } = require('../controllers/authController');

router.post('/register', register, csrfProtection);
router.post('/login', login, csrfProtection);
router.get('/logout', logout);

module.exports = router;
