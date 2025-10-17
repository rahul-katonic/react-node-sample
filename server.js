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
    <title>Node React Deployment</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(to bottom right, #fdfbfb, #ebedee);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        
        .wrapper {
            max-width: 800px;
            width: 100%;
        }
        
        .main-card {
            background: white;
            border-radius: 15px;
            padding: 40px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
            text-align: center;
        }
        
        .title {
            font-size: 3rem;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 15px;
            font-weight: bold;
        }
        
        .welcome-text {
            font-size: 1.5rem;
            color: #555;
            margin-bottom: 30px;
        }
        
        .cards-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        
        .feature-card {
            background: white;
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            text-align: center;
        }
        
        .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }
        
        .feature-card.node {
            border-top: 4px solid #68a063;
        }
        
        .feature-card.react {
            border-top: 4px solid #61dafb;
        }
        
        .feature-card.deploy {
            border-top: 4px solid #ff6b6b;
        }
        
        .card-icon {
            font-size: 2.5rem;
            margin-bottom: 15px;
        }
        
        .card-title {
            font-size: 1.2rem;
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
        }
        
        .card-text {
            font-size: 0.9rem;
            color: #777;
            line-height: 1.5;
        }
        
        .success-badge {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 30px;
            border-radius: 50px;
            font-size: 1rem;
            font-weight: 600;
            margin-top: 20px;
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="main-card">
            <h1 class="title">Hello World</h1>
            <p class="welcome-text">Welcome to Node React App Deployment</p>
            <div class="success-badge">✓ Successfully Deployed</div>
        </div>
        
        <div class="cards-container">
            <div class="feature-card node">
                <div class="card-icon">⚡</div>
                <h3 class="card-title">Node.js</h3>
                <p class="card-text">Powered by Express.js backend</p>
            </div>
            
            <div class="feature-card react">
                <div class="card-icon">⚛️</div>
                <h3 class="card-title">React</h3>
                <p class="card-text">Modern frontend framework</p>
            </div>
            
            <div class="feature-card deploy">
                <div class="card-icon">🚀</div>
                <h3 class="card-title">Deployed</h3>
                <p class="card-text">Live and running</p>
            </div>
        </div>
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
