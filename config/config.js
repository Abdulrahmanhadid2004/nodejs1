require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'abdulrahmanhadid2004',
  sessionSecret: process.env.SESSION_SECRET || 'abdulrahmanhadid2004',
  nodeEnv: process.env.NODE_ENV || 'development'
};