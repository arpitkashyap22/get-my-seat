const express = require('express');
const router = express.Router();
const busConductorController = require('../controllers/busConductorControllers.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

router.post('/login', busConductorController.login);
router.post('/update-available-seats', authMiddleware, busConductorController.updateAvailableSeats);

// Add other bus conductor-related routes as needed

module.exports = router;
