const ApiAudioScribeController = require('../MVC/controllers/apiAudioScribeController');
const express = require('express');
const router = express.Router();
const apiAudioScribeController = new ApiAudioScribeController();
router.post('/upload-audio', (req, res) => apiAudioScribeController.uploadAudioFile(req, res));
router.post('/transcribe', (req, res) => apiAudioScribeController.transcribe(req, res));
module.exports = router;