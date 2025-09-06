const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    console.warn('[AUTH] No token provided');
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('[AUTH] Token verified for user:', decoded.id);
    next();
  } catch (err) {
    console.error('[AUTH] Invalid token:', err.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};