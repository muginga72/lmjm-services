// src/services/promoProductService.js
// import promoProducts from "../data/promoProducts.json";

export const fetchPromoProducts = async () => {
  try {
    const response = await fetch("/server/data/promoProducts.json"); // Adjust path as needed
    if (!response.ok) throw new Error("Failed to fetch promo products");
    return await response.json();
  } catch (error) {
    console.error("Error fetching promo products:", error);
    return [];
  }
};
