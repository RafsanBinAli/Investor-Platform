import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./DefaultNavbar.css";

const DefaultNavbar = () => (
	<Navbar className="navigation-bar" expand="lg">
		<Navbar.Brand className="title"as={Link} to="/">
			Investor Platform
		</Navbar.Brand>
		<Navbar.Toggle aria-controls="basic-navbar-nav" />
		<Navbar.Collapse id="basic-navbar-nav">
			<Nav className="ml-auto">
				<Nav.Link className="navbar-link" as={Link} to="/about">
					About Us
				</Nav.Link>
				<Nav.Link className="navbar-link" as={Link} to="/faq">
					FAQ
				</Nav.Link>
			</Nav>
		</Navbar.Collapse>
	</Navbar>
);
export default DefaultNavbar;
