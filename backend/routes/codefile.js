'use strict';
const codefileController = require('../controllers/codefile');
const express = require('express');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
    destination: './codefiles',
    filename(req, file, cb) {
      cb(null, `${file.originalname}`);
    },
  });
  
  const upload = multer({ storage });

router.post('/', upload.single('file'), codefileController.uploadedCode);
module.exports = router;