const axios = require('axios');
const fetch = require('node-fetch');
const fetchNews = async (category = 'general') => {
    try {
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=c4c2fe63e4274e0db086238c67058629`;
        console.log("🔎 Fetching news from:", url);
        const { data } = await axios.get(url);

        console.log(`✅ Articles fetched ${category}:`, data.articles.length);
        return data.articles || [];
    } catch (err) {
        console.error("❌ Error fetching news:", err.response?.data || err.message);
        return [];
    }
};

module.exports = fetchNews;
