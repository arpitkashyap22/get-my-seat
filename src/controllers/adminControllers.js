const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const BusConductor = require('../models/BusConductor');
const Bus = require('../models/Bus');
const { SECRET_ACCESS_TOKEN } = process.env;
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log("here");
  try {
    const admin = await Admin.findOne({ username });
    
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials admin' });
    }

    // const isPasswordValid = await bcrypt.compare(password, admin.password);
    // console.log(isPasswordValid);
    if (password == admin.password) {
      const token = jwt.sign({ id: admin._id, role: 'Admin' }, SECRET_ACCESS_TOKEN, { expiresIn: '1h' });
      console.log(token);
      res.json({ token, admin });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newAdmin = new Admin({
      username,
      password,
    });

    await newAdmin.save();
    res.json({ message: 'Admin registered successfully.', admin: newAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find({}, { busNumber: 1, route: 1, availableSeats: 1, _id: 0 });
    res.json(buses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createBus = async (req, res) => {
  const { busNumber, route, availableSeats, defaultAvailableSeats } = req.body;

  try {
    const bus = new Bus({
      busNumber,
      route,
      availableSeats,
      defaultAvailableSeats,
    });

    await bus.save();
    res.json({ message: 'Bus created successfully.', bus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateBus = async (req, res) => {
  const { busNumber, route, availableSeats, defaultAvailableSeats } = req.body;

  try {
    const bus = await Bus.findOne({ busNumber });
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    bus.route = route || bus.route;
    bus.availableSeats = availableSeats || bus.availableSeats;
    bus.defaultAvailableSeats = defaultAvailableSeats || bus.defaultAvailableSeats;

    await bus.save();
    res.json({ message: 'Bus updated successfully.', bus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBus = async (req, res) => {
  const { busNumber } = req.body;

  try {
    const bus = await Bus.findOneAndDelete({ busNumber });
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    res.json({ message: 'Bus deleted successfully.', bus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


exports.createAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = new Admin({
      username,
      password,
    });

    await admin.save();
    res.json({ message: 'Admin created successfully.', admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.createBusConductor = async (req, res) => {
  const { name, username, password, assignedBus } = req.body;

  try {
    const busConductor = new BusConductor({
      name,
      username,
      password,
      assignedBus,
    });

    await busConductor.save();
    res.json({ message: 'Bus conductor created successfully.', busConductor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


// Add other admin-related controller functions as needed
