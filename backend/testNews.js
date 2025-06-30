const axios = require('axios');

const testNews = async () => {
     const category = 'general';
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=c4c2fe63e4274e0db086238c67058629`;
  try {
    const { data } = await axios.get(url);
    console.log('Status:', data.status);
    console.log('Total Results:', data.totalResults);
    console.log('Articles:', data.articles.length);
  } catch (err) {
    console.error('Error:', err.response?.data || err.message);
  }
};

testNews();
