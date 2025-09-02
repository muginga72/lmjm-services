import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import ServiceCardWithModals from "../components/ServiceCardWithModals";
import { fetchPromoProducts } from "../services/promoProductService";

const HomePage = () => {
  const [promoProducts, setPromoProducts] = useState([]);
  const [backendData, setBackendData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [promoData, backendRes] = await Promise.all([
          fetchPromoProducts(),
          fetch("/api").then((res) => res.json()),
        ]);
        setPromoProducts(promoData);
        setBackendData(backendRes);
      } catch (err) {
        setError("Unable to load data from backend.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container fluid="md" className="px-3">
      <NavigationBar />
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Welcome to LMJ Services</h1>
        <p>Explore our mission, values, and what makes us different.</p>

        <div style={{ marginBottom: "2rem" }}>
          <button
            onClick={() => window.open("/who-we-are", "_blank")}
            style={{
              marginRight: "1rem",
              backgroundColor: "lightgray",
              color: "blue",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Who We Are
          </button>
          <button
            onClick={() => navigate("/contact")}
            style={{
              backgroundColor: "lightgray",
              color: "blue",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* Promo Products Section */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {promoProducts.map((product) => (
          <Col key={product.id}>
            <ServiceCardWithModals
              title={product.name}
              description={product.description}
              image={product.image}
            />
          </Col>
        ))}
      </Row>

      {/* Services Section */}
      <Row className="mb-5">
        {backendData?.services?.map((service) => (
          <Col key={service.id} xs={12} sm={6} md={4} className="mb-4">
            <Card style={{ maxWidth: "100%", height: "100%" }}>
              {service.image && (
                <Card.Img
                  variant="top"
                  src={service.image}
                  alt={service.title}
                  style={{ objectFit: "cover", height: "200px" }}
                />
              )}
              <Card.Body>
                <Card.Title>{service.title}</Card.Title>
                <Card.Text>{service.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Footer */}
      <footer className="bg-light text-center py-4 border-top">
        <small>
          &copy; {new Date().getFullYear()} LMJ Services. All rights reserved.
        </small>
      </footer>
    </Container>
  );
};

export default HomePage;
