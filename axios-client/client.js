const axios = require('axios');
const baseUrl = 'http://localhost:5000/books';

// Task 10: Callback
function getBooksCallback(cb) {
  axios.get(baseUrl)
    .then(res => cb(null, res.data))
    .catch(err => cb(err));
}

// Task 11: Promise
function getBookByISBN(isbn) {
  return axios.get(`${baseUrl}/isbn/${isbn}`);
}

// Task 12: Async/Await - Author
async function getBooksByAuthor(author) {
  const res = await axios.get(`${baseUrl}/author/${author}`);
  return res.data;
}

// Task 13: Async/Await - Title
async function getBooksByTitle(title) {
  const res = await axios.get(`${baseUrl}/title/${title}`);
  return res.data;
}

// Test calls (uncomment to run):
// getBooksCallback((err, data) => console.log(err || data));
// getBookByISBN('123456789').then(res => console.log(res.data));
// getBooksByAuthor('Paulo Coelho').then(console.log);
// getBooksByTitle('Atomic Habits').then(console.log);
