const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for client requests
app.use(cors());

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Optional: serve something at root
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Actual data endpoint
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

// Mount testimonials route BEFORE app.listen
const testimonialsRoute = require('./routes/testimonials');
// app.use('/testimonials', testimonialsRoute);
app.use('/api/testimonials', require('./routes/testimonials'));

// Fallback for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});