import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import Auth from '../lib/auth';

class NavbarComp extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname)
      this.setState({ navbarActive: false});
  }
  render(){
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">MyBlog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link1">Recent</Nav.Link>
            <Nav.Link href="#link2">Popular</Nav.Link>
            <NavDropdown title="Cathegories">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="/register">Join us</Nav.Link>
            {!Auth.isAuthenticated() && <Nav.Link href="/login">Sign in</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default withRouter(NavbarComp);
