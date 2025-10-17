const express = require('express');
const path = require('path');
const app = express();
const PORT = 8050;

// Subpath to serve the app on
const SUBPATH = process.env.ROUTE + '/';

// Middleware to parse JSON
app.use(express.json());

// Root endpoint - serving HTML
app.get('/', (req, res) => {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
        }
        
        .center-text {
            text-align: center;
            font-size: 24px;
            color: #333;
        }
    </style>
</head>
<body>
    <div class="center-text">
        Hello World welcome to node react app deployment
    </div>
</body>
</html>
  `;
  res.send(htmlContent);
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
      { path: '/', method: 'GET', description: 'HTML homepage' },
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
