/*import { useNavigate, Link } from "react-router-dom";
export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav>
      <ul>
        <li>
          <a href="">Overviews</a>
        </li>
        <li>
          <Link to={"/tasks"}>Tasks</Link>
        </li>
        <li>
          <a href="">Timesheets</a>
        </li>
        <li>
          <a href="">Files</a>
        </li>
        <li>
          <a href="">Discussions</a>
        </li>
        <li>
          <a href="">Activity Feed </a>
        </li>
      </ul>
    </nav>
  );
};*/

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
function NavbarComp() {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Brand href="#home">Kanban</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Overview</Nav.Link>
              <Nav.Link href="/tasks">Tasks</Nav.Link>
              <Nav.Link href="#pricing">Milestones</Nav.Link>
              <Nav.Link href="#pricing">Timesheets</Nav.Link>
              <Nav.Link href="#pricing">Files</Nav.Link>
              <Nav.Link href="#pricing">Discussions</Nav.Link>
              <Nav.Link href="#pricing">ActivityFeed</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
export default NavbarComp;
