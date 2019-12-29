'use strict';
const codeController = require('../controllers/code');
const express = require('express');
const router = express.Router();

router.post('/python', codeController.runPython);
module.exports = router;