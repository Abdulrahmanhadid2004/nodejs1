require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'a*******************',
  sessionSecret: process.env.SESSION_SECRET || 'a*******************',
  nodeEnv: process.env.NODE_ENV || 'development'
};