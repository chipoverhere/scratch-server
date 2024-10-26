// index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Use the port set by Vercel or default to 3000

// Middleware to parse JSON requests
app.use(express.json());

// In-memory storage
let dataStore = {};

// Endpoint to push data
app.post('/push', (req, res) => {
  const { key, value } = req.body;

  if (!key || !value) {
    return res.status(400).json({ error: 'Key and value are required' });
  }

  dataStore[key] = value;
  return res.status(200).json({ message: 'Data pushed successfully', dataStore });
});

// Endpoint to get data
app.get('/get/:key', (req, res) => {
  const { key } = req.params;
  const value = dataStore[key];

  if (value === undefined) {
    return res.status(404).json({ error: 'Key not found' });
  }

  return res.status(200).json({ key, value });
});

// Roo
