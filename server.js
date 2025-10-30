const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
app.use(bodyParser.json());

// session setup
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true
}));

// routes
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);

app.listen(config.port, () => {
  console.log(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
});
