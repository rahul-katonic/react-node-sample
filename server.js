const express = require('express');
const path = require('path');
const app = express();
const PORT = 8050;

// Subpath to serve the app on
const SUBPATH = process.env.ROUTE || '/app';

// Root route - shows app is working
app.get(`${SUBPATH}/`, (req, res) => {
  res.json({
    status: 'success',
    message: 'App is working!',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Ping route
app.get('/ping', (req, res) => {
  res.send('pong');
});

// Health check route
app.get('/readyz', (req, res) => {
  res.status(200).send('OK');
});

// Start server
app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
