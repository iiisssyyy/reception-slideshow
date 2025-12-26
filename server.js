const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();

// IMPORTANT: use the port GitHub provides
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));

// Explicit root handler
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Image scraping endpoint
app.get('/images', async (req, res) => {
  try {
    const response = await fetch(
      'https://u.pcloud.link/publink/show?code=kZyStj5ZOYjg7eRulDVOoV9FzH625QdSmkok'
    );
    const html = await response.text();

    const imgRegex = /<img[^>]+src="([^"]+)"/g;
    const images = [];
    let match;

    while ((match = imgRegex.exec(html))) {
      images.push(match[1]);
    }

    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch images');
  }
});

// LISTEN ON ALL INTERFACES + CORRECT PORT
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
