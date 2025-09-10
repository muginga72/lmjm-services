// In-memory testimonials
const testimonials = [
  { id: 1, name: "Alice", message: "Exceptional service and quality!" },
  { id: 2, name: "Bob", message: "I highly recommend them to everyone." },
];

// GET /api/testimonials
function getTestimonials(req, res) {
  res.json({ testimonials });
}

// POST /api/testimonials
function createTestimonial(req, res) {
  const { name, message } = req.body;
  const newTestimonial = { id: testimonials.length + 1, name, message };
  testimonials.push(newTestimonial);
  res.status(201).json({ testimonial: newTestimonial });
}

module.exports = { getTestimonials, createTestimonial };