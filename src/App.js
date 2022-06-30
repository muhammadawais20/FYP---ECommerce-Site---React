import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./config/firebase";
import Home from './pages/AdminPages/Home/Home';
import UserList from "./pages/AdminPages/UserList/UserList";
import NewUser from './pages/AdminPages/NewUser/NewUser';
import AdminList from "./pages/AdminPages/AdminList/AdminList";
import NewAdmin from './pages/AdminPages/NewAdmin/NewAdmin';
import NewProducts from './pages/AdminPages/NewProducts/NewProducts';
import ProductList from "./pages/AdminPages/ProductList/ProductList";
import Homepages from './pages/WebsitePages/HomePage/HomePage';
import ProductInfo from './pages/WebsitePages/ProductInfo/ProductInfo';
import CartPage from './pages/WebsitePages/CartPage/CartPage';
import CheckOut from './pages/WebsitePages/CheckOut/CheckOut';
import Order from './pages/WebsitePages/Order/Order';
import WebLogin from './pages/WebsitePages/LoginPage/Login';
import SignUp from './pages/WebsitePages/SignUpPage/SignUp'
import About from './pages/WebsitePages/AboutPage/About';
import ContactPage from './pages/WebsitePages/ContactPage/Contact';
import PrivacyPolicy from './pages/WebsitePages/PrivacyPolicyPage/PrivacyPolicy';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';
import OrderList from "./pages/AdminPages/OrderList/OrderList";
import ForgetPassword from "./pages/WebsitePages/ForgetPassword/ForgetPassword";
import Loader from "./components/WebsiteComponents/Loader/Loader";
import DeliveryList from "./pages/AdminPages/DeliveryList/DeliveryList";
import OrdersCompletedList from "./pages/AdminPages/OrdersCompletedList/OrdersCompletedList";
import CustomerList from "./pages/AdminPages/CustomerList/CustomerList";

const App = () => {
  const [user, setUser] = useState();
  const [admin, setAdmin] = useState();
  const { loggedIn, adminStatus } = useSelector(state => state.cartReducer);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  let currentUser = JSON.parse(localStorage.getItem('currentUser')).user.email;

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      setUser(user)
      dispatch({
        type: "currentUser",
        payload: user,
      });
      // if (user != null &&  user.email === "awais20@gmail.com") {
        if (user.email === "awais20@gmail.com") {
        dispatch({
          type: 'setAdmin',
          adminStatus: true,
        })
        dispatch({
          type: 'setLoggedIn',
          loggedIn: false,
        })
        // adminStateChange()
        // navigate('/adminHome')
      } else {
        dispatch({
          type: 'setLoggedIn',
          loggedIn: true,
        })
        dispatch({
          type: 'setAdmin',
          adminStatus: false,
        })

      }
      setLoading(false)
    });
    setLoading(false)

  }, []);

  // function adminStateChange() {
  //   auth.onAuthStateChanged(function (admin) {
  //     setAdmin(admin)
  //     dispatch({
  //       type: "adminHome",
  //       payload: admin,
  //     });
  //   });
  // }
  // useEffect(() => {
  //   adminStateChange()
  // }, [admin]);

  // function authChecker(user, component, path = "/") {
  //   return user ? component : <Navigate to={path} />;
  // }

  if (loading)
    return (
      <Loader />
    );


  return (
    <div className="App">

      <ToastContainer />
      <BrowserRouter>
        {adminStatus ?
          <Routes>
            <Route path="/adminHome" index element={<Home />}></Route>

            <Route path="/admins">
              <Route index element={<AdminList />} />
              <Route path="newAdmin" element={<NewAdmin title="Add New Admin" />} />
            </Route>
            
            <Route path="/users">
              <Route index element={<UserList />} />
              <Route path="newUser" element={<NewUser title="Add New User" />} />
            </Route>

            <Route path="/customers">
              <Route index element={ <CustomerList /> } />
            </Route>
            

            <Route path="/products">
              <Route index element={<ProductList />} />
              <Route path="newProduct" element={<NewProducts title="Add New Product" />} />
            </Route>

            <Route path="/orders">
              <Route index element={<OrderList />} />
            </Route>

            <Route path="/delivery">
              <Route index element={ <DeliveryList /> } />
            </Route>

            <Route path="/orderscompleted">
              <Route index element={ <OrdersCompletedList /> } />
            </Route>
            
            <Route path="*" element={<Home />}></Route>
          </Routes> :

          loggedIn ?
            <Routes>
              <Route path="/" index element={<Homepages />} />
              <Route path="/productInfo/:productid" element={<ProductInfo />}></Route>
              <Route path="/cartpage" element={<CartPage />}></Route>
              <Route path="/checkOut" element={<CheckOut />}></Route>
              <Route path="/order" element={<Order />} ></Route>
              <Route path="/weblogin" element={<WebLogin />}></Route>
              <Route path="/aboutpage" element={<About />}></Route>
              <Route path="/contactpage" element={<ContactPage />}></Route>
              <Route path="/privacypage" element={<PrivacyPolicy />}></Route>
            </Routes>

            : <Routes>
              <Route path="/" index element={<Homepages />} />
              <Route path="/productInfo/:productid" element={<ProductInfo />}></Route>
              <Route path="/weblogin" element={<WebLogin />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
              <Route path="/aboutpage" element={<About />}></Route>
              <Route path="/contactpage" element={<ContactPage />}></Route>
              <Route path="/privacypage" element={<PrivacyPolicy />}></Route>
              <Route path="/forgetpassword" element={<ForgetPassword />}></Route>
              <Route path="*" element={<Homepages />}></Route>
            </Routes>

        }


        {/* <Routes>
          {/* <Route path="/">
            <Route index element={<Homepages />} />
            <Route path="/login" element={<Login />} />
          </Route> */}

        {/* <Route path="/" index element={<Homepages/>}></Route> 

          <Route path="/users">
            <Route index element={<UserList />} />
            <Route path=":userId" element={<SingleUser />} />
            <Route path="newUser" element={<NewUser title="Add New User" />} />
          </Route>

          <Route path="/products">
            <Route index element={<ProductList />} />
            <Route path=":productId" element={<SingleUser />} />
            <Route path="newProduct" element={<NewProducts title="Add New Product" />} />
          </Route>
          <Route path="/adminHome" element={<Home/>}></Route>
          <Route path="/productInfo/:productid" element={<ProductInfo/>}></Route>
          <Route path="/cartpage" element={<CartPage/>}></Route>
          <Route path="/weblogin" element={<WebLogin/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/aboutpage" element={<About/>}></Route>
          <Route path="/contactpage" element={<ContactPage/>}></Route>
          <Route path="/privacypage" element={<PrivacyPolicy/>}></Route>
        </Routes> */}
      </BrowserRouter>
    </div>

  );
}

export default App;

// export const ProtectRoutes = ({children})=> {
//   if(localStorage.getItem('currentUser')){
//     return children
//   }
//   else{
//     <Navigate to="/"/>
//   }
// }
