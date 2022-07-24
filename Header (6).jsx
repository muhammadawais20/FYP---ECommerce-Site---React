import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Offcanvas, Nav, NavDropdown, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../../config/firebase';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { toast } from 'react-toastify';
import "./Header.css";



const Header = () => {
  const { cartitems, loggedIn, user } = useSelector(state => state.cartReducer);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(() => {
      dispatch({
        type: 'setLoggedOut',
        loggedIn: false,
        adminStatus: false
      })
      dispatch({ type: 'CLEAR_ALL_CART', payload: [] });
      localStorage.removeItem('currentUser');
      localStorage.removeItem('AdminStatus');
      localStorage.removeItem('LoggedIn');
      toast.success(`${user.email.substring(0, user.email.length - 10)} Logout successfull`)
      navigate('/')
    })
  }

  return (
  <>
    {['md'].map((expand) => (
      <Navbar key={expand} bg="light" expand={expand}>
        <Container fluid>
          <Navbar.Brand as={Link} to={"/"} style={{fontSize: '22px', fontWeight: '600'}}>KhassDryFruits</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton >
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                KhassDryFruits
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3 navLinkStyle">
                {
                  !loggedIn && <>
                    <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
                    <Nav.Link as={Link} to={"/weblogin"}>Login</Nav.Link>
                    <Nav.Link as={Link} to={"/signup"}>Sign-Up</Nav.Link>
                  </>
                }
                {
                  loggedIn && <>
                    <Nav.Link>{loggedIn && user != undefined ? user.email.substring(0, user.email.length - 10) : ""}</Nav.Link>
                    <Nav.Link as={Link} to={"/order"}>orders</Nav.Link>
                    <Nav.Link onClick={handleLogout}>logout</Nav.Link>
                    <Nav.Link as={Link} to={"/cartpage"}>
                      cart
                      <AddShoppingCartIcon />
                      {cartitems.length}
                    </Nav.Link>
                  </>
                }

              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    ))}

    {/* <div className='conatiner'>
      <div className='wrapper'>
        <div className='left'>
          <div className='Logo'>
            <h4>KhassDry Fruits</h4>
          </div>
        </div>
        <div className='right'>
          <div className='MeunItem'>
            {
              !loggedIn && <>
                <ul key="nav">
                  <li>
                    <Link className="link" to="/">
                      Home
                    </Link>
                    <Link className="link" to="/weblogin">
                      Login
                    </Link>
                    <Link className="link" to="/signup">
                      SignIn
                    </Link>
                  </li>
                </ul>
              </>
            }
            {
              loggedIn && <>
                <ul key="nav">
                  <li>
                    <span>{loggedIn && user != undefined ? user.email.substring(0, user.email.length - 10) : ""}</span>
                    <Link className="link" to="/">
                      Home
                    </Link>
                    <button className='logout' onClick={handleLogout}>Logout</button>
                    <Link className="link" to="/order">
                      Order
                    </Link>
                    <Link className="link" to="/cartpage">
                      cart
                      <AddShoppingCartIcon />
                      {cartitems.length}
                    </Link>
                  </li>
                </ul>
              </>
            }
          </div>
        </div>
      </div> */}

    {/* <Navbar bg="light" expand="lg" className="navbar-show">
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
                  <Nav.Link as={Link} to={"/signup"} >Sign-In</Nav.Link>
                </>
              }
              {
                loggedIn && <>
                  <Nav.Link>{currentUser}</Nav.Link>
                  <Nav.Link as={Link} to={"/order"}>orders</Nav.Link>
                  <Nav.Link onClick={handleLogout}>logout</Nav.Link>
                  <Nav.Link as={Link} to={"/cartpage"}>
                    cart
                    <AddShoppingCartIcon />
                    {cartitems.length}
                  </Nav.Link>
                </>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  */}
    {/* </div> */}
  </>
  )
}

export default Header
