const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BusConductor = require('../models/BusConductor.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const { SECRET_ACCESS_TOKEN } = process.env;


exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const busConductor = await BusConductor.findOne({ username }).populate('assignedBus');

    if (!busConductor) {
      return res.status(401).json({ message: 'Invalid credentials username' });
    }

    // const isPasswordValid = await bcrypt.compare(password, busConductor.password);

    if (password == busConductor.password) {
      const token = jwt.sign({ id: busConductor._id, role: 'BusConductor' }, SECRET_ACCESS_TOKEN , { expiresIn: '1h' });
      res.json({ token, bus: busConductor.assignedBus });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateAvailableSeats = async (req, res) => {
  const { availableSeats } = req.body;

  try {
    const busConductor = await BusConductor.findOne({ _id: req.user.id }).populate('assignedBus');
    if (!busConductor) {
      return res.status(404).json({ message: 'Bus conductor not found' });
    }

    // Update available seats only if the assigned bus is found and the user is a bus conductor
    if (busConductor.assignedBus && req.user.role === 'BusConductor') {
      busConductor.assignedBus.availableSeats = availableSeats;
      await busConductor.assignedBus.save();
      res.json({ message: 'Available seats updated successfully.', bus: busConductor.assignedBus });
    } else {
      res.status(403).json({ message: 'Forbidden: You do not have permission to update available seats on this bus.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
// exports.updateAvailableSeats = async (req, res) => {
//   try {
//     // The authenticated user (bus conductor) details are available in req.user
//     const { assignedBus, availableSeats } = req.body;
//     // const { assignedBus } = req.user;

//     // Validate that the required fields are present
//     if (availableSeats === undefined || assignedBus === undefined) {
//       return res.status(400).json({ error: 'Invalid request. Please provide all required fields.' });
//     }

//     // Find the bus by assignedBus (busNumber associated with the logged-in bus conductor)
//     const bus = await Bus.findOne({ busNumber: assignedBus });

//     if (!bus) {
//       return res.status(404).json({ error: 'Bus not found for the logged-in bus conductor.' });
//     }

//     // Update available seats
//     bus.availableSeats = availableSeats;
//     await bus.save();

//     res.json({ message: 'Available seats updated successfully.', updatedBus: bus });
//   } catch (error) {
//     console.error('Update available seats failed:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };