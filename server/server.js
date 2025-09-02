const express = require("express");
const path = require("path");
const cors = require("cors");
const promoProductRoutes = require("./routes/promoProductRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for client requests
app.use(cors());

// Serve static images from /public/images
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Serve static files from the "public" directory
// app.use(express.static("public"));

// Optional: serve something at root
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Mount API routes
app.use("/api/products", promoProductRoutes);

// Actual data endpoint
app.get("/api", (req, res) => {
  res.json({
    services: [
      {
        id: 1,
        title: "Retail trade of beverages",
        description: "Offering a wide variety of drinks and refreshments.",
        image: "/images/beverage.jpg", 
      },
      {
        id: 2,
        title: "Buffet services",
        description: "Delicious self-serve meals for events and gatherings.",
        image: "/images/buffet.jpg",
      },
      {
        id: 3,
        title: "Tutoring",
        description: "Personalized academic support for students.",
        image: "/images/tutoring.jpg",
      },
      {
        id: 4,
        title: "Beauty salon",
        description: "Hair, skin, and nail treatments to help you shine.",
        image: "/images/beauty-salon.jpg",
      },
      {
        id: 5,
        title: "Wedding Events",
        description: "Elegant planning and coordination for unforgettable weddings.",
        image: "/images/wedding.jpg",
      },
      {
        id: 6,
        title: "Web Development",
        description: "Custom websites and web apps tailored to your business.",
        image: "/images/web-dev.jpg",
      },
    ],
  });
});

// Fallback for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});