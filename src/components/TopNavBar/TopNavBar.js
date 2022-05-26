import React, { useContext} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Nav,
  Form,
  Navbar,
  Button,
  Container,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import NotesContext from "../../Context/note/NoteContext";

function TopNavBar() {

  const navigator = useNavigate();
  const noteState = useContext(NotesContext);

  const handdleLoutOut =()=>{
    localStorage.setItem("loginToken",'');
    noteState.setIsLoggedIn(()=> {return false})
    navigator('/')
  }

  return (
    <div className="top-nav-bar">
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">i NoteBook</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav>
                <Link to="/">Home</Link>
              </Nav>
              <Nav>
                <Link to="/notes">Your Notes</Link>
              </Nav>
              {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
          <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action5">
            Something else here
          </NavDropdown.Item>
        </NavDropdown> */}
              {/* <Nav.Link href="#" disabled>
          Link
        </Nav.Link> */}
            </Nav>
            <Form className="d-flex">
              <Button variant="primary" className={`mx-2 ${noteState.isLoggedIn? 'd-none':''}`}>
                <Link to="/login">Login</Link>
              </Button>
              <Button variant="primary" className={`mx-2 ${noteState.isLoggedIn? 'd-none':''}`}>
                <Link to="/signup">Sign Up</Link>
              </Button>
              <Button onClick={handdleLoutOut} variant="primary" className={`mx-2 ${noteState.isLoggedIn? '':'d-none'}`}>
                 Log Out
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default TopNavBar;
