// routes/testimonials.js
const express = require('express');
const router = express.Router();

router.get('/testimonials', (req, res) => {
  res.json({
    wedding: [
      {
        name: "Sophie & Liam",
        quote: "The party salon made our wedding unforgettable. The themed décor and interactive stations were a hit with guests of all ages.",
      },
      {
        name: "Jasmine R.",
        quote: "From planning to execution, everything was seamless. The team truly understood our vision and brought it to life.",
      },
      {
        name: "Carlos & Mei",
        quote: "We loved the flexibility in layout and the vibrant atmosphere. It felt like a dream come true.",
      }
    ],
    tutoringChemistry: [
      {
        name: "Aiden T.",
        quote: "Chemistry used to feel impossible. Now I’m acing my exams thanks to the personalized tutoring and progress tracking.",
      },
      {
        name: "Dr. Nguyen",
        quote: "The modular lesson plans and interactive tools helped my students grasp complex concepts with confidence.",
      },
      {
        name: "Emily S.",
        quote: "Tutoring chemistry online felt surprisingly engaging. The dashboard kept me motivated and focused.",
      }
    ]
  });
});

module.exports = router;