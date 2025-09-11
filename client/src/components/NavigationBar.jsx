// src/components/NavigationBar.js
import React, { useContext, useState } from 'react';
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Modal,
  Button,
  Form
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../assets/logo.png';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const NavigationBar = () => {
  const { user, setUser } = useContext(UserContext);

  // modal visibility
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // shared form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Open modals (resetting state)
  const openLogin = () => {
    setError('');
    setEmail('');
    setPassword('');
    setShowLogin(true);
  };
  const openSignup = () => {
    setError('');
    setEmail('');
    setPassword('');
    setShowSignup(true);
  };

  // Handlers
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      // assume { user: {...}, token: '…' }
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setShowLogin(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/register', { email, password });
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setShowSignup(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get('/api/auth/logout');
    } catch (_) {
      // swallow
    }
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="d-flex align-items-center">
              <img
                src={logo}
                alt="Logo"
                width="50"
                height="50"
                className="me-2"
              />
              LMJ Services
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>

              <NavDropdown title="Services" id="services-dropdown">
                <LinkContainer to="/services/web-development">
                  <NavDropdown.Item>Web Development</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/services/wedding-events">
                  <NavDropdown.Item>Wedding Events</NavDropdown.Item>
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
                  <NavDropdown.Item>Beauty Salon</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </Nav>

            <Nav className="ms-auto">
              {!user && (
                <>
                  <Nav.Link onClick={openLogin}>Log In</Nav.Link>
                  <Nav.Link onClick={openSignup}>Sign Up</Nav.Link>
                </>
              )}
              {user && (
                <>
                  <Navbar.Text className="me-3">
                    Hello, {user.name || user.email}
                  </Navbar.Text>
                  <Button variant="outline-secondary" onClick={handleLogout}>
                    Log Out
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Login Modal */}
      <Modal show={showLogin} onHide={() => setShowLogin(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <p className="text-danger">{error}</p>}
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="loginEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="loginPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Log In
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Signup Modal */}
      <Modal show={showSignup} onHide={() => setShowSignup(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <p className="text-danger">{error}</p>}
          <Form onSubmit={handleSignup}>
            <Form.Group controlId="signupEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="signupPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavigationBar;
