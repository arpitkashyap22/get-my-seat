// server/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminControllers.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const authController = require('../controllers/authController.js')

router.post('/create-admin', authController.register1);
router.post('/create-bus-conductor', authMiddleware, adminController.createBusConductor);
router.get('/all-buses', authMiddleware, adminController.getAllBuses);
router.post('/create-bus', authMiddleware, adminController.createBus);
router.put('/update-bus', authMiddleware, adminController.updateBus);
router.delete('/delete-bus', authMiddleware, adminController.deleteBus);


router.post('/login', adminController.login);
router.post('/register', adminController.register);

// Protected route - requires authentication
router.get('/protected-route', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route for admins.' });
});

// Add other admin routes as needed

module.exports = router;
