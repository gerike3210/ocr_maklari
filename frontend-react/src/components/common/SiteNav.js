import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

function SiteNav({ isAuthenticated, user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/">Home</Link>
          </Navbar.Brand>
          <Navbar.Brand>
            <Link to="/upload">Upload</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {isAuthenticated !== false && (
              <Nav className="ms-md-auto">
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "#fff",
                    textAlign: "center",
                    lineHeight: "1.75",
                  }}
                >
                  {user.attributes.email}
                </Typography>
                <Link onClick={handleLogout}>Logout</Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default SiteNav;
