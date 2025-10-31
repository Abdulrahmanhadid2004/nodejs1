const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(
  (config) => {
    if (global.jwtToken) {
      config.headers.Authorization = `Bearer ${global.jwtToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

module.exports = api;