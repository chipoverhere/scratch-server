// index.js
const express = require('express');
const app = express();
app.use(express.json());

let dataStore = {}; // In-memory storage

// Endpoint to push data
app.post('/push', (req, res) => {
  const { key, value } = req.body;
  if (!key || !value) {
    return res.status(400).json({ error: 'Key and value are required' });
  }
  dataStore[key] = value;
  res.status(200).json({ message: 'Data pushed successfully' });
});

// Endpoint to get data
app.get('/get/:key', (req, res) => {
  const { key } = req.params;
  const value = dataStore[key];
  if (!value) {
    return res.status(404).json({ error: 'Key not found' });
  }
  res.status(200).json({ key, value });
});

module.exports = app;
