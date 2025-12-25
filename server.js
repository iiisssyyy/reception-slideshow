// server.js
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files from 'public' folder
app.use(express.static('public'));

// Ensure '/' serves index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to fetch images from pCloud
app.get('/images', async (req, res) => {
  try {
    const html = await fetch(
      'https://u.pcloud.link/publink/show?code=kZyStj5ZOYjg7eRulDVOoV9FzH625QdSmkok'
    ).then(r => r.text());

    const imgRegex = /<img [^>]*src="([^"]+)"/g;
    const imgs = [];
    let match;
    while ((match = imgRegex.exec(html))) {
      imgs.push(match[1]);
    }

    // Return images as JSON
    res.json(imgs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching images');
  }
});

// Start server and listen on all interfaces for Codespaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
