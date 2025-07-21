const express = require('express');
const router = express.Router();
const books = require('../books');
const { verifyToken } = require('../middleware/auth');

// Add or modify a review
router.put('/review/:isbn', verifyToken, (req, res) => {
  const { isbn } = req.params;
  const { review } = req.body;
  const username = req.user.username;

  if (books[isbn]) {
    books[isbn].reviews[username] = review;
    res.json({ message: 'Review added/updated' });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// Delete a review
router.delete('/review/:isbn', verifyToken, (req, res) => {
  const { isbn } = req.params;
  const username = req.user.username;

  if (books[isbn] && books[isbn].reviews[username]) {
    delete books[isbn].reviews[username];
    res.json({ message: 'Review deleted' });
  } else {
    res.status(404).json({ message: 'Review not found or not yours' });
  }
});

module.exports = router;
