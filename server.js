const express = require('express');
const path = require('path');
const app = express();
const PORT = 8050;

// Subpath to serve the app on
const SUBPATH = process.env.ROUTE + '/';

// Middleware to parse JSON
app.use(express.json());

// Root health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Application is running',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Subpath health check endpoint
app.get(SUBPATH, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: '🎉 Sample Node.js app deployed successfully!',
    details: {
      route: SUBPATH,
      port: PORT,
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    }
  });
});

// API info endpoint
app.get(`${SUBPATH}info`, (req, res) => {
  res.status(200).json({
    status: 'success',
    application: 'Sample Node.js Application',
    version: '1.0.0',
    description: 'This is a sample deployment to verify your Node.js environment',
    endpoints: [
      { path: '/', method: 'GET', description: 'Root health check' },
      { path: SUBPATH, method: 'GET', description: 'App health check' },
      { path: `${SUBPATH}info`, method: 'GET', description: 'Application information' },
      { path: `${SUBPATH}status`, method: 'GET', description: 'Deployment status' }
    ],
    timestamp: new Date().toISOString()
  });
});

// Deployment status endpoint
app.get(`${SUBPATH}status`, (req, res) => {
  res.status(200).json({
    status: 'success',
    deployment: {
      state: 'active',
      message: 'Deployment successful',
      uptime: process.uptime(),
      environment: {
        nodeVersion: process.version,
        platform: process.platform,
        port: PORT,
        route: SUBPATH
      }
    },
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found',
    availableEndpoints: ['/', SUBPATH, `${SUBPATH}info`, `${SUBPATH}status`],
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
