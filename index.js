const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const busConductorRoutes = require('./src/routes/busConductorRoutes.js');
const adminRoutes = require('./src/routes/adminRoutes.js');
const busRoutes = require('./src/routes/busRoutes.js');
const Bus = require('./src/models/Bus.js');

require('dotenv').config();
const { MongoURL, PORT } = process.env;

const app = express();
app.use(bodyParser.json());


// app.use(cors());

// Use routes
app.use('/api/buses', busRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/bus-conductor', busConductorRoutes);


// Define the cron job to run every day at midnight (0 0 * * *)
cron.schedule('0 0 * * *', async () => {
    try {
      // Update available seats to default values for all buses
      await Bus.updateMany({}, { $set: { availableSeats: '$defaultAvailableSeats' } });
      console.log('Updated available seats to default values.');
    } catch (error) {
      console.error('Error updating available seats:', error.message);
    }
  }, {
    timezone: 'Asia/Kolkata', // timezone accordingly
});

  
mongoose.connect(MongoURL)
    .then(() =>{
        console.log(`App is connected to DB`);
        app.listen(PORT, () => {
            console.log(`App is listning to port: ${PORT}`);
        })
    })
    .catch((err) => {
        console.log(err);
    })
