const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the "public" directory
app.use(express.static("public"));

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
        title: "Retail trade of beverages",
        description: "Offering a wide variety of drinks and refreshments.",
        image: "https://example.com/images/beverage.jpg", // assuming public/images/beverage.jpg
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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});