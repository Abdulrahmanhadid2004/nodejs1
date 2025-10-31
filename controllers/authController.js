const jwt = require('jsonwebtoken');
const { register, login } = require('../models/userModel');
const config = require('../config/config');
const api = require('../config/axiosConfig');

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await register(username, password);
    res.json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await login(username, password);

    const token = jwt.sign({ username: user.username }, config.jwtSecret, { expiresIn: '1h' });

    // Just return the token to the client
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};