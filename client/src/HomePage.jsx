import React, { useEffect, useState } from "react";
import { Container, Navbar, Row, Col, Card } from "react-bootstrap";

const HomePage = () => {
  const [backendData, setBackendData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => setBackendData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Container fluid="md" className="px-3">
      <Navbar bg="light" expand="lg" className="mb-4">
        <Navbar.Brand href="#">Your Company</Navbar.Brand>
      </Navbar>

      {/* Services Section */}
      <Row className="mb-5">
        {!backendData ? (
          <p>Loading...</p>
        ) : (
          backendData.services.map((service) => (
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
          ))
        )}
      </Row>

      {/* Footer */}
      <footer className="text-center py-4 border-top">
        <small>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </small>
      </footer>
    </Container>
  );
};

export default HomePage;
