const express = require('express');
const combinationsController = require('../controllers/combinationController');

const router = express.Router();

router.post('/generate', combinationsController.handleCombinationRequest);

module.exports = router;
