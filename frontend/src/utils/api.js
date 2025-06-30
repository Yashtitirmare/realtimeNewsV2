import axios from 'axios';

const api = axios.create({
  baseURL: 'https://realtimenewsv2.onrender.com/api',
});


export default api;
