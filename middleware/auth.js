const jwt = require('jsonwebtoken');
const secret = 'your_jwt_secret';

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'Token required' });

  jwt.verify(token.split(' ')[1], secret, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

module.exports = { verifyToken, secret };
