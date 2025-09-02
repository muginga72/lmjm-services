// controllers/promoProductController.js
const promoProducts = require("../data/promoProducts");

const getAllPromoProducts = (req, res) => {
  res.json({ data: promoProducts });
};

module.exports = { getAllPromoProducts };