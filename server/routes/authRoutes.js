// const express = require('express');
// const router = express.Router();
// const { signin, signout } = require('../controllers/authController');

// router.post('/signin', signin);
// router.post('/signout', signout);

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const users = []; // Replace with DB in production

// // Register
// router.post('/register', async (req, res) => {
//   const { email, password } = req.body;
//   const existing = users.find(u => u.email === email);
//   if (existing) return res.status(400).json({ error: 'User already exists' });

//   const hashed = await bcrypt.hash(password, 10);
//   users.push({ email, password: hashed });
//   res.status(201).json({ email });
// });

// // Login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = users.find(u => u.email === email);
//   if (!user) return res.status(400).json({ error: 'User not found' });

//   const match = await bcrypt.compare(password, user.password);
//   if (!match) return res.status(401).json({ error: 'Invalid credentials' });

//   const token = jwt.sign({ email }, 'secretKey', { expiresIn: '1h' });
//   res.json({ token, email });
// });

// module.exports = router;

// server/routes/authRoutes.js
// const express = require('express');
// const router = express.Router();

// Example login route
// router.post('/login', (req, res) => {
//   const { email, password } = req.body;
//   // Replace with real auth logic
//   if (email === 'test@example.com' && password === '123456') {
//     res.json({ token: 'fake-jwt-token' });
//   } else {
//     res.status(401).json({ message: 'Invalid credentials' });
//   }
// });

// module.exports = router;

const express = require("express");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const { getServices } = require("../controllers/serviceController");
require("dotenv").config();
const passport = require('passport');

const router = express.Router();

router.get("/", getServices);

// POST /api/auth/register
router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email } = req.body;
    const user = { id: Date.now(), email };
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(201)
      .json({ user, token });
  }
);

// POST /api/auth/login
router.post(
  "/login",
  body("email").isEmail(),
  body("password").exists(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email } = req.body;
    const user = { id: 1, email };
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .json({ user, token });
  }
);

// GET /api/auth/logout
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

module.exports = router;