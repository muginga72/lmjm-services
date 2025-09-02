import React, { useEffect, useState } from "react";
import { Container, Row, Col, Carousel, Image, Spinner, Alert } from "react-bootstrap";
import { fetchProducts } from "../services/productProductService";
import "bootstrap/dist/css/bootstrap.min.css";

const ServicesPromoProducts = () => {
  const [promoProducts, setPromoProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts()
      .then((items) => {
        setPromoProducts(items);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">Error: {error}</Alert>
      </Container>
    );
  }

  return (
    <div>
    <Container fluid className="bg-light py-5 px-4 shadow-sm">
      <Row className="align-items-center">
        <Col md={4} className="text-center text-md-start mb-4 mb-md-0">
          <h2 className="fw-bold text-danger">Buy for Half Price</h2>
          <p className="lead text-muted">Select from our Products List</p>
          <button
            onClick={() => window.open("/learn-more", "_blank")}
            style={{
              marginRight: "1rem",
              backgroundColor: "lightgray",
              color: "green",
              border: "none",
              padding: "0.5rem 1rem",
            }}
          >
            Learn More
          </button>
        </Col>

        <Col md={8} className="d-flex justify-content-center">
          <Carousel className="w-75 text-center">
            {promoProducts.map((promoProduct) => (
              <Carousel.Item key={promoProduct.id}>
                <div className="d-flex flex-column align-items-center">
                  <Image
                    src={promoProduct.image}
                    alt={promoProduct.name}
                    fluid
                    rounded
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Carousel.Caption className="text-center">
                    <h5>{promoProduct.name}</h5>
                    <p>{promoProduct.description}</p>
                  </Carousel.Caption>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default ServicesPromoProducts;