// In-memory service list
const services = [
  { id: 1, title: "🍹 Retail Beverages", description: "Offering a wide variety of drinks and refreshments.", image: "/images/beverage.png" },
  { id: 2, title: "🍽️ Buffet Services", description: "Delicious self-serve meals for events and gatherings.", image: "/images/buffet.png" },
  { id: 3, title: "📚 Tutoring", description: "Personalized academic support for students.", image: "/images/tutoring.png" },
  { id: 4, title: "💇 Beauty Salon", description: "Hair, skin, and nail treatments to help you shine.", image: "/images/beauty-salon.png" },
  { id: 5, title: "💍 Wedding Events", description: "Elegant planning and coordination for unforgettable weddings.", image: "/images/wedding.png" },
  { id: 6, title: "🧑‍💻 Web Development", description: "Custom websites and web apps tailored to your business.", image: "/images/web-dev.png" },
];

// GET /api/services
function getServices(req, res) {
  res.json({ services });
}

// GET /api/services/:id
function getServiceById(req, res) {
  const id = Number(req.params.id);
  const svc = services.find((s) => s.id === id);
  if (!svc) {
    return res.status(404).json({ message: "Service not found" });
  }
  res.json({ service: svc });
}

// POST /api/services
function createService(req, res) {
  const { title, description, image } = req.body;
  const newService = {
    id: services.length + 1,
    title,
    description,
    image,
  };
  services.push(newService);
  res.status(201).json({ service: newService });
}

module.exports = { services, getServices, getServiceById, createService };