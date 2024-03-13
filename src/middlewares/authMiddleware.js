const jwt = require('jsonwebtoken');
require('dotenv').config();

const { SECRET_ACCESS_TOKEN } = process.env;

module.exports = async (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = await jwt.verify(token, SECRET_ACCESS_TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
