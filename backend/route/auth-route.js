const express = require('express');
const { signup, login, saveScore } = require('../controller/auth-controller');
const authenticateToken = require('./../middleware/auth-mid');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/save-score', authenticateToken, saveScore);

module.exports = router;
