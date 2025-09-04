import React from "react";
import { Container, Row, Col, Carousel, Image, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ServicesPromo = () => {
  // const navigate = useNavigate();

  const products = [
    {
      name: "Beauty Promotion",
      image: "/images/beautyPromo.jpg",
    },
    {
      name: "Dinner",
      image: "/images/dinner.png",
    },
    {
      name: "Buffet",
      image: "/images/buffet.png",
    },
    // {
    //   name: "Chemistry Tutor",
    //   image: "/images/tutor-chemistry.png",
    // },
    {
      name: "Wedding",
      image: "/images/wedding.png",
    },
        {
      name: "Dinner",
      image: "/images/dinner.png",
    },
  ];

  return (
    <div>
      <Container fluid className="bg-light py-5 px-4 shadow-sm">
        <Row className="align-items-center">
          <Col md={4} className="text-center text-md-start mb-4 mb-md-0">
            <h2 className="fw-bold text-danger">Buy for Half Price</h2>
            <p className="lead text-muted">Select from our Products List</p>
            <Button
              onClick={() => window.open("/learn-more", "_blank")}
              style={{
                marginRight: "1rem",
                backgroundColor: "lightgray",
                color: "green",
                borderRadius: '12px',
                borderColor: "gray"
              }}
            >
              Learn More
            </Button>
          </Col>
          <Col md={8} className="d-flex justify-content-center">
            <Carousel className="w-75 text-center">
              {products.map((product, index) => (
                <Carousel.Item key={index}>
                  <div className="d-flex flex-column align-items-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fluid
                      rounded
                      style={{
                        height: "200px",
                        objectFit: "cover",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Carousel.Caption className="text-center">
                      <h5>{product.name}</h5>
                      <p>{product.description}</p>
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

export default ServicesPromo;