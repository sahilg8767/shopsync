const express = require('express');
const router = express.Router();
const { receiveOCRData } = require('../controllers/ocrController');

// POST /api/ocr - Receive OCR data
router.post('/', receiveOCRData);

module.exports = router;
