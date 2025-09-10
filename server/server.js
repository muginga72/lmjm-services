// const express = require("express");
// const path = require("path");
// const cors = require("cors");
// const mongoose = require("mongoose");
// require("dotenv").config();
// const authRoutes = require('./routes/authRoutes');

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.set('view engine', 'ejs');
// app.set('views', './views');

// app.use(cors());
// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));

// // Simulate logged-in user
// app.use((req, res, next) => {
//   req.user = { name: 'Eli' };
//   next();
// });

// // Render homepage with user
// app.get('/', (req, res) => {
//   res.render('index', { user: req.user });
// });

// // API data endpoint
// app.get("/api", (req, res) => {
//   res.json({
//     services: [
//       { id: 1, title: "🍹 Retail Beverages", description: "Offering a wide variety of drinks and refreshments.", image: "/beverage.png" },
//       { id: 2, title: "🍽️ Buffet services", description: "Delicious self-serve meals for events and gatherings.", image: "/buffet.png" },
//       { id: 3, title: "📚 Tutoring", description: "Personalized academic support for students.", image: "/tutoring.png" },
//       { id: 4, title: "💇 Beauty salon", description: "Hair, skin, and nail treatments to help you shine.", image: "/beauty-salon.png" },
//       { id: 5, title: "💍 Wedding Events", description: "Elegant planning and coordination for unforgettable weddings.", image: "/wedding.png" },
//       { id: 6, title: "🧑‍💻 Web Development", description: "Custom websites and web apps tailored to your business.", image: "/web-dev.png" },
//     ],
//   });
// });

// // Auth and testimonials routes
// app.use('/api/auth', authRoutes);
// app.use('/api/testimonials', require('./routes/testimonials'));

// // Fallback
// app.use((req, res) => {
//   res.status(404).json({ message: "Not Found" });
// });

// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

// server/server.js
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const passport = require("passport");
require('./config/passport')(passport);

const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/services");
const testimonialRoutes = require("./routes/testimonials");
const notFound = require("./middleware/notFound");
const { services } = require("./controllers/serviceController");

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// 2. Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 3. Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, "public")));

// 4. Simulate logged-in user
app.use((req, res, next) => {
  req.user = { name: "Eli" };
  next();
});

// 5. Render homepage with service data
app.get("/", (req, res) => {
  res.render("index", { user: req.user, services });
});

// 6. API routes
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/testimonials", testimonialRoutes);

// 7. 404 handler
app.use(notFound);

// 8. Error handler
app.use((err, req, res, next) => {
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(status).json({ message: err.message });
});

// 9. Start server
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});