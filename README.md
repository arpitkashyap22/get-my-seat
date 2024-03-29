# MERN Stack Bus Management System

This is a simple Bus Management System implemented using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The system allows administrators to manage buses and bus conductors, while bus conductors can update the available seats on their assigned buses.

## Features

- **Admin Portal:**
  - Login and authentication for admin users.
  - View details of all buses.
  - Create, update, and delete buses.

- **Bus Conductor Portal:**
  - Login and authentication for bus conductors.
  - Update available seats for the assigned bus.

- **Automatic Daily Update:**
  - A cron job updates available seats to default values for all buses every day.

## Installation

1. **Clone the repository:**


# Start the server
npm run dev
 
# Start the client (in a new terminal window)
cd ../backend
npm start
Access the application in your browser at http://localhost:3000.

## Usage
Admin Portal:

Visit http://localhost:3000/admin and log in with your admin credentials.
Use the provided routes to manage buses.
Bus Conductor Portal:

Visit http://localhost:3000/bus-conductor and log in with your bus conductor credentials.
Update available seats for the assigned bus.

## Dependencies
Node.js
Express.js
MongoDB
React.js

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

## License

