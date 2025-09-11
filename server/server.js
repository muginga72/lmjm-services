require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const authRoutes = require("./routes/authRoutes");
const testimonialsRoute = require("./routes/testimonials");

const app = express();
const PORT = process.env.PORT || 5000;

// Validate environment variables
if (!process.env.MONGO_URI) {
  console.error("❌ Missing MONGO_URI in .env");
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json()); // ✅ Parse JSON bodies
app.use(express.static(path.join(__dirname, "public"))); // ✅ Serve static assets

// Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/testimonials", testimonialsRoute);

// Data endpoint
app.get("/api", (req, res) => {
  res.json({
    services: [
      {
        id: 1,
        title: "🍹 Retail Beverages",
        description: "Offering a wide variety of drinks and refreshments.",
        image: "/beverage.png",
      },
      {
        id: 2,
        title: "🍽️ Buffet services",
        description: "Delicious self-serve meals for events and gatherings.",
        image: "/buffet.png",
      },
      {
        id: 3,
        title: "📚 Tutoring",
        description: "Personalized academic support for students.",
        image: "/tutoring.png",
      },
      {
        id: 4,
        title: "💇 Beauty salon",
        description: "Hair, skin, and nail treatments to help you shine.",
        image: "/beauty-salon.png",
      },
      {
        id: 5,
        title: "💍 Wedding Events",
        description: "Elegant planning and coordination for unforgettable weddings.",
        image: "/wedding.png",
      },
      {
        id: 6,
        title: "🧑‍💻 Web Development",
        description: "Custom websites and web apps tailored to your business.",
        image: "/web-dev.png",
      },
    ],
  });
});

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message });
});

// Fallback route
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});