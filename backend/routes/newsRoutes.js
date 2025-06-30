const express = require('express');
const protect = require('../middleware/auth');
const fetchNews = require('../utils/fetchNews');

const router = express.Router();

// Get news based on user's preference
router.get('/', protect, async (req, res) => {
  try {
    console.log("🔐 User from token:", req.user);
    const categories = req?.user?.preferences?.categories || ['general'];
    console.log("📑 Categories to fetch:", categories);

    const allNews = [];

    for (const category of categories) {
      const news = await fetchNews(category);
      console.log(`🌐 News fetched for category "${category}":`, news.length);
      allNews.push(...news);
    }

    res.json(allNews);
  } catch (err) {
    console.error("❌ News fetch error:", err.message);
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
