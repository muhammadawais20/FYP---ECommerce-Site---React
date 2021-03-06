// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Navbar, Container, Nav } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import { auth } from '../../../config/firebase';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import { toast } from 'react-toastify';
// import logo from './Logo.png';
// import "./Header.css";

// const Header = () => {
//   const { cartitems, loggedIn, user } = useSelector(state => state.cartReducer);
//   const dispatch = useDispatch()
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     auth.signOut().then(() => {
//       dispatch({
//         type: 'setLoggedOut',
//         loggedIn: false,
//         adminStatus: false
//       })
//       dispatch({ type: 'CLEAR_ALL_CART', payload: [] });
//       localStorage.removeItem('currentUser');
//       localStorage.removeItem('AdminStatus');
//       localStorage.removeItem('LoggedIn');
//       toast.success(`${user.email.substring(0, user.email.length - 10)} Logout Successfully!`)
//       navigate('/weblogin');
//     })
//   }

//   return (
//     <div>
//       <Navbar bg="light" expand="lg" className="navbar-show">
//         <Container fluid>
//           <div className='navbar-brand'>
//             <Navbar.Brand as={Link} to={"/"} ><img src={logo} alt='Logo' className="navbar-logo" /></Navbar.Brand>
//           </div>
//           <Navbar.Toggle aria-controls="navbarScroll" />
//           <Navbar.Collapse id="navbarScroll">
//             <Nav
//               className="ms-auto my-2 my-lg-0"
//               style={{ maxHeight: '100px' }}
//               navbarScroll
//             >

//               {
//                 !loggedIn && <>
//                   <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
//                   <Nav.Link as={Link} to={"/weblogin"}>Login</Nav.Link>
//                   <Nav.Link as={Link} to={"/signup"} >Signup</Nav.Link>
//                 </>
//               }
//               {
//                 loggedIn && <>

//                   <Nav.Link as={Link} to={"/"}>
//                     <span>{loggedIn && user != undefined ? user.email.substring(0, user.email.length - 10) : ""}</span>
//                   </Nav.Link>
//                   <Nav.Link as={Link} to={"/order"}>Orders</Nav.Link>
//                   <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
//                   <Nav.Link as={Link} to={"/cartpage"}>
//                     Cart
//                     <AddShoppingCartIcon />
//                     {cartitems.length}
//                   </Nav.Link>
//                 </>
//               }
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </div>
//   )
// }

// export default Header



import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../../config/firebase';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { toast } from 'react-toastify';
import logo from './Logo.png';
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
      toast.success(`${user.email.substring(0, user.email.length - 10)} Logout Successfully!`)
      navigate('/weblogin');
    })
  }

  
  return (
    <div>
    
    {['md'].map((expand) => (
      <Navbar bg="light" expand="sm" className="navbar-show">
        <Container fluid>
          <div className='navbar-brand'>
            <Navbar.Brand as={Link} to={"/"} ><img src={logo} alt='Logo' className="navbar-logo" /></Navbar.Brand>
          </div>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton >
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} as={Link} to={"/"}>
              <img src={logo} alt='Logo' className="navbar-logo" />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3 navLinkStyle">
                {
                  !loggedIn && <>
                    <Nav.Link as={Link} to={"/"} style={{color: "#555"}}>Home</Nav.Link>
                    <Nav.Link as={Link} to={"/weblogin"} style={{color: "#555"}}>Login</Nav.Link>
                    <Nav.Link as={Link} to={"/signup"} style={{color: "#555"}}>Sign-Up</Nav.Link>
                  </>
                }
                {
                  loggedIn && <>
                    <Nav.Link as={Link} to={"/"} style={{color: "#555"}}>{loggedIn && user != undefined ? user.email.substring(0, user.email.length - 10) : ""}</Nav.Link>
                    <Nav.Link  style={{color: "#555"}} as={Link} to={"/order"}>Orders</Nav.Link>
                    <Nav.Link style={{color: "#555"}} onClick={handleLogout}>Logout</Nav.Link>
                    <Nav.Link style={{color: "#555"}} as={Link} to={"/cartpage"}>
                      Cart
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
    </div>
  )
}

export default Header