const Bus = require('../models/Bus');

exports.getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find({}, { busNumber: 1, route: 1, availableSeats: 1, _id: 0 });
    res.json(buses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};