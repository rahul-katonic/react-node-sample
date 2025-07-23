const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Subpath to serve the app on
const SUBPATH = '/app';

// Serve static files under the subpath
app.use(SUBPATH, express.static(path.join(__dirname, 'build')));

// For all other routes under subpath, serve index.html (for SPA routing)
app.get(`${process.env.ROUTE}/*`, (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}${SUBPATH}`);
});
