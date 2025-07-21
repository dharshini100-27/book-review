const express = require('express');
const router = express.Router();
const books = require('../books');
const { users, isValid } = require('../users');
const jwt = require('jsonwebtoken');
const { secret } = require('../middleware/auth');

// Get all books
router.get('/', (req, res) => {
  res.json(books);
});

// Get book by ISBN
router.get('/isbn/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  if (book) res.json(book);
  else res.status(404).json({ message: 'Book not found' });
});

// Get books by author
router.get('/author/:author', (req, res) => {
  const author = req.params.author;
  const result = Object.entries(books).filter(([_, book]) => book.author === author);
  res.json(Object.fromEntries(result));
});

// Get books by title
router.get('/title/:title', (req, res) => {
  const title = req.params.title;
  const result = Object.entries(books).filter(([_, book]) => book.title === title);
  res.json(Object.fromEntries(result));
});

// Get book reviews
router.get('/review/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  if (book) res.json(book.reviews);
  else res.status(404).json({ message: 'Book not found' });
});

// Register user
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!isValid(username)) return res.status(400).json({ message: 'User already exists' });
  users.push({ username, password });
  res.json({ message: 'User registered successfully' });
});

// Login user
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(403).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ username }, secret, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
