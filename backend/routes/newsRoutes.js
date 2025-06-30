const express = require('express');
const protect = require('../middleware/auth');
const fetchNews = require('../utils/fetchNews');

const router = express.Router();

// Get news based on user's preference
router.get('/', protect, async (req, res) => {
  try {
    const validCategories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
    let categories = req?.user?.preferences?.categories || ['general'];

    // Normalize and filter categories
    categories = categories.map(cat => cat.toLowerCase());
    const filteredCategories = categories.filter(cat => validCategories.includes(cat));
    if (filteredCategories.length === 0) filteredCategories.push('general');

    console.log("📑 Valid categories to fetch:", filteredCategories);

    const allNews = [];

    for (const category of filteredCategories) {
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
