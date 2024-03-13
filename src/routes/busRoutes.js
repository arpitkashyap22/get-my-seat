const express = require('express');
const router = express.Router();
const busController = require('../controllers/buscontrollers.js');

router.get('/', busController.getAllBuses);

// Add other bus-related routes as needed

module.exports = router;
