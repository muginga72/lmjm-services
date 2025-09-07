// const express = require("express");
// const path = require("path");
// const cors = require("cors");
// const mongoose = require("mongoose");
// require("dotenv").config();
// const authRoutes = require('./routes/authRoutes');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Set EJS as the view engine
// app.set('view engine', 'ejs');
// app.set('views', './views');

// // Enable CORS for client requests
// app.use(cors());

// // Serve static files from 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));

// // Optional: serve something at root
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// // Actual data endpoint
// app.get("/api", (req, res) => {
//   res.json({
//     services: [
//       {
//         id: 1,
//         title: "🍹 Retail Beverages",
//         description: "Offering a wide variety of drinks and refreshments.",
//         image: "/beverage.png", 
//       },
//       {
//         id: 2,
//         title: "🍽️ Buffet services",
//         description: "Delicious self-serve meals for events and gatherings.",
//         image: "/buffet.png",
//       },
//       {
//         id: 3,
//         title: "📚 Tutoring",
//         description: "Personalized academic support for students.",
//         image: "/tutoring.png",
//       },
//       {
//         id: 4,
//         title: "💇 Beauty salon",
//         description: "Hair, skin, and nail treatments to help you shine.",
//         image: "/beauty-salon.png",
//       },
//       {
//         id: 5,
//         title: "💍 Wedding Events",
//         description: "Elegant planning and coordination for unforgettable weddings.",
//         image: "/wedding.png",
//       },
//       {
//         id: 6,
//         title: "🧑‍💻 Web Development",
//         description: "Custom websites and web apps tailored to your business.",
//         image: "/web-dev.png",
//       },
//     ],
//   });
// });

// // Example middleware to simulate a logged-in user
// app.use((req, res, next) => {
//   // Change this to null to test "Guest"
//   req.user = { name: 'Eli' };
//   next();
// });

// // Routes
// app.get('/', (req, res) => {
//   res.render('index', { user: req.user });
// });

// const authRoutes = require('./routes/authRoutes');
// app.use('/api/auth', authRoutes);

// // Mount testimonials route BEFORE app.listen
// const testimonialsRoute = require('./routes/testimonials');
// // app.use('/testimonials', testimonialsRoute);
// app.use('/api/testimonials', require('./routes/testimonials'));

// // Fallback for unknown routes
// app.use((req, res) => {
//   res.status(404).json({ message: "Not Found" });
// });

// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Simulate logged-in user
app.use((req, res, next) => {
  req.user = { name: 'Eli' };
  next();
});

// Render homepage with user
app.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

// API data endpoint
app.get("/api", (req, res) => {
  res.json({
    services: [
      { id: 1, title: "🍹 Retail Beverages", description: "Offering a wide variety of drinks and refreshments.", image: "/beverage.png" },
      { id: 2, title: "🍽️ Buffet services", description: "Delicious self-serve meals for events and gatherings.", image: "/buffet.png" },
      { id: 3, title: "📚 Tutoring", description: "Personalized academic support for students.", image: "/tutoring.png" },
      { id: 4, title: "💇 Beauty salon", description: "Hair, skin, and nail treatments to help you shine.", image: "/beauty-salon.png" },
      { id: 5, title: "💍 Wedding Events", description: "Elegant planning and coordination for unforgettable weddings.", image: "/wedding.png" },
      { id: 6, title: "🧑‍💻 Web Development", description: "Custom websites and web apps tailored to your business.", image: "/web-dev.png" },
    ],
  });
});

// Auth and testimonials routes
app.use('/api/auth', authRoutes);
app.use('/api/testimonials', require('./routes/testimonials'));

// Fallback
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});