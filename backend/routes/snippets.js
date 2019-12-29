'use strict';
const snippetsController = require('../controllers/snippets');
const express = require('express');
const router = express.Router();

router.get('/', snippetsController.getSnippets);
module.exports = router;