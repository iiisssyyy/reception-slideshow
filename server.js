const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Endpoint to fetch images from pCloud
app.get('/images', async (req, res) => {
  try {
    const html = await fetch('https://u.pcloud.link/publink/show?code=kZyStj5ZOYjg7eRulDVOoV9FzH625QdSmkok')
                     .then(r => r.text());

    const imgRegex = /<img [^>]*src="([^"]+)"/g;
    const imgs = [];
    let match;
    while ((match = imgRegex.exec(html))) {
      imgs.push(match[1]);
    }

    res.json(imgs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching images');
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
