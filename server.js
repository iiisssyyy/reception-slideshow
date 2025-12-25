// server.js
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files from 'public' folder
app.use(express.static('public'));

// Optional: explicit route to index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to fetch images from your pCloud public URL
app.get('/images', async (req, res) => {
  try {
    const html = await fetch(
      'https://u.pcloud.link/publink/show?code=kZyStj5ZOYjg7eRulDVOoV9FzH625QdSmkok'
    ).then(r => r.text());

    // Extract all <img src="..."> URLs
    const imgRegex = /<img [^>]*src="([^"]+)"/g;
    const imgs = [];
    let match;
    while ((match = imgRegex.exec(html))) {
      imgs.push(match[1]);
    }

    // Send array of image URLs to browser
    res.json(imgs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching images');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
