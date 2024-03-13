// server/models/BusConductor.js
const mongoose = require('mongoose');

const busConductorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  assignedBus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus',
    required: true,
  },
});

const BusConductor = mongoose.model('BusConductor', busConductorSchema);

module.exports = BusConductor;
