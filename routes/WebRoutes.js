const AudioAnalyzerAIController = require('../MVC/controllers/audioanalyzerAIController');
const express = require('express');
const router = express.Router();
const audioanalyzerAIController = new AudioAnalyzerAIController();
router.get('/', audioanalyzerAIController.start);
router.get('/audioanalyzer', audioanalyzerAIController.start);
module.exports = router;