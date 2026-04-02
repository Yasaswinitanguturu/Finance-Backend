const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authorize = require('../middleware/roleauth');

// Note: This is just '/summary' because '/api/dashboard' is added in server.js
router.get('/summary', authorize(['Admin', 'Analyst']), dashboardController.getSummary);

module.exports = router;