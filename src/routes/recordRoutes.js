const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');
const authorize = require('../middleware/roleauth'); // <--- Import the guard

// 1. Anyone (Admin, Analyst, Viewer) can view records
router.get('/all', authorize(['Admin', 'Analyst', 'Viewer']), recordController.getAllRecords);

// 2. ONLY Admin can add records
router.post('/add', authorize(['Admin']), recordController.createRecord);

module.exports = router;