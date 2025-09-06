import { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Modal,
  Button,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import useAuth from "../hooks/useAuth";
import logo from "../assets/logo.png";
import SignIn from "../components/SignIn";

const NavigationBar = () => {
  const { token, logout, user } = useAuth();
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignOut, setShowSignOut] = useState(false);

  const handleAuthClick = () => {
    if (token) {
      setShowSignOut(true);
    } else {
      setShowSignIn(true);
    }
  };

  const handleLogoutConfirm = () => {
    logout();
    setShowSignOut(false);
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="d-flex align-items-center gap-2">
              <img
                src={logo}
                alt="LMJ Logo"
                width="80"
                height="80"
                className="rounded-circle"
              />
              LMJ Services
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* Auth Link */}
              <Nav.Link
                onClick={handleAuthClick}
                style={{
                  marginRight: "15px",
                  fontWeight: "500",
                  cursor: "pointer",
                  color: token ? "#dc3545" : "#007bff",
                }}
              >
                {token ? `Sign Out (${user?.name || "User"})` : "Sign In"}
              </Nav.Link>

              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>

              <NavDropdown title="Services" id="services-dropdown">
                <LinkContainer to="/services/web-development">
                  <NavDropdown.Item>Web Development</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/services/wedding-events">
                  <NavDropdown.Item>Wedding</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/services/tutoring">
                  <NavDropdown.Item>Tutoring</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/services/buffet">
                  <NavDropdown.Item>Buffet</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/services/beverages">
                  <NavDropdown.Item>Beverages</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/services/beauty">
                  <NavDropdown.Item>Beauty</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Sign In Modal */}
      <Modal
        className="custom-modal"
        show={showSignIn}
        onHide={() => setShowSignIn(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignIn />
        </Modal.Body>
      </Modal>

      {/* Sign Out Confirmation Modal */}
      <Modal
        className="custom-modal"
        show={showSignOut}
        onHide={() => setShowSignOut(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Sign Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to sign out?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="custom-btn-secondary"
            onClick={() => setShowSignOut(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            className="custom-btn-danger"
            onClick={handleLogoutConfirm}
          >
            Sign Out
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavigationBar;
