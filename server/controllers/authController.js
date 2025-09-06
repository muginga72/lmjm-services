const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

exports.signin = async (req, res) => {
  try {
    console.log('[SIGNIN] Incoming request:', req.body);

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      console.warn('[SIGNIN] User not found:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.warn('[SIGNIN] Password mismatch for:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    console.log('[SIGNIN] Auth successful for:', email);
    res.status(200).json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    console.error('[SIGNIN] Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.signout = (req, res) => {
  console.log('[SIGNOUT] User signed out');
  res.status(200).json({ message: 'Signout successful' });
};