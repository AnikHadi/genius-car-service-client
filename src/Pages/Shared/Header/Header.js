import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auth from "../../../firebase.init";
import Loading from "../Loading/Loading";
import logo from "./../../../images/logo.png";
import "./Header.css";

const Header = () => {
  const [user, loading, error] = useAuthState(auth);
  const [signOut, loading1, error1] = useSignOut(auth);

  if (error || error1) {
    return (
      <div>
        <p>
          Error: {error.message} {error1.message}
        </p>
      </div>
    );
  }

  if (loading || loading1) {
    return <Loading />;
  }

  if (user) {
    console.log(user);
  }

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      sticky="top"
      bg="primary"
      variant="dark"
    >
      <Container>
        <Navbar.Brand as={Link} to="/home">
          <img height={30} src={logo} alt="" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link href="#service">Service</Nav.Link>
            <Nav.Link href="#expert">Expert</Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <NavDropdown title="Admin Panel" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/manage">
                Manage
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Admin view All
              </NavDropdown.Item>
              {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

        <Nav>
          <Navbar.Text>
            {user ? (
              <div>
                {user?.displayName} {/* <img src={user?.photoURL} alt="" /> */}
                <Link
                  onClick={async () => {
                    const success = await signOut();
                    if (success) {
                      toast("You are sign out");
                    }
                  }}
                >
                  Sign out
                </Link>
              </div>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </Navbar.Text>
        </Nav>
      </Container>
      <ToastContainer />
    </Navbar>
  );
};

export default Header;
