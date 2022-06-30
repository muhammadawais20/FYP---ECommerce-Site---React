import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../../config/firebase';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import "./Header.css";


const Header = () => {
  const { cartitems, loggedIn } = useSelector(state => state.cartReducer);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  let currentUser = JSON.parse(localStorage.getItem('currentUser')).user.email;

  const handleLogout = () => {
    auth.signOut().then(() => {
      dispatch({
        type: 'setLoggedOut',
        loggedIn: false,
        adminStatus: false
      })
      navigate('/weblogin')
    })
  }

  return (
    <div>
      <Navbar bg="light" expand="lg" className="navbar-show">
        <Container fluid>
          <div className='navbar-brand'>
            <Navbar.Brand as={Link} to={"/"} > <span className="navbar-logo"></span></Navbar.Brand>
          </div>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              {
                !loggedIn && <>
                  <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
                  <Nav.Link as={Link} to={"/weblogin"}>Login</Nav.Link>
                  <Nav.Link as={Link} to={"/signup"} >Signup</Nav.Link>
                </>
              }
              {
                loggedIn && <>
                  <Nav.Link as={Link} to={"/"}>{currentUser}</Nav.Link>
                  <Nav.Link as={Link} to={"/order"}>Orders</Nav.Link>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                  <Nav.Link as={Link} to={"/cartpage"}>
                    Cart
                    <AddShoppingCartIcon />
                    {cartitems.length}
                  </Nav.Link>


                </>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
