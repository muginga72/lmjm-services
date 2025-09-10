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