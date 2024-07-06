const express = require('express');
const router = express.Router();
const axios = require('axios');

const { register, login, logout } = require('../controllers/authController');
const csrfProtection = require('../middleware/csrfProtection');

const verifyCaptcha = async (req, res, next) => {
    const { captchaValue } = req.body;
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=6LczzwkqAAAAAMAosH001Qtn2lD2bwlBoe3npDX1&response=${captchaValue}`;
    
    try {
      const captchaResponse = await axios.post(verifyUrl);
      if (!captchaResponse.data.success) {
        return res.status(400).json({ error: 'Invalid CAPTCHA' });
      }
      next();
    } catch (error) {
      return res.status(500).json({ error: 'CAPTCHA verification failed' });
    }
  };

router.post('/register', register, csrfProtection);
router.post('/login', login, csrfProtection);
router.get('/logout', logout);

module.exports = router;
