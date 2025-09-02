// routes/promoProductRoutes.js
const express = require("express");
const router = express.Router();
const promoProducts = require("../data/promoProducts");

// const { getAllPromoProducts } = require("../controllers/promoProductController");

// router.get("/", getAllPromoProducts);

// GET /api/products
router.get("/", (req, res) => {
  res.json(promoProducts);
});

module.exports = router;