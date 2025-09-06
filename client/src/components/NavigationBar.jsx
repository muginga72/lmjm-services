import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import logo from '../assets/logo.png';

const NavigationBar = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (token) {
      logout();
      navigate('/');
    } else {
      navigate('/auth');
    }
  };

  return (
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

            <Nav.Link onClick={handleAuthClick}>
              {token ? 'Sign Out' : 'Sign In'}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;