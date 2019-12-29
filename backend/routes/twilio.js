'use strict';
const twilioController = require('../controllers/twilio');
const express = require('express');
const router = express.Router();

router.post('/token', twilioController.getToken);
module.exports = router;