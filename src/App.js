import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/AdminPages/Home/Home";
import UserList from "./pages/AdminPages/UserList/UserList";
import NewUser from "./pages/AdminPages/NewUser/NewUser";
import AdminList from "./pages/AdminPages/AdminList/AdminList";
import NewAdmin from "./pages/AdminPages/NewAdmin/NewAdmin";
import NewProducts from "./pages/AdminPages/NewProducts/NewProducts";
import ProductList from "./pages/AdminPages/ProductList/ProductList";
import Homepages from "./pages/WebsitePages/HomePage/HomePage";
import ProductInfo from "./pages/WebsitePages/ProductInfo/ProductInfo";
import CartPage from "./pages/WebsitePages/CartPage/CartPage";
import CheckOut from "./pages/WebsitePages/CheckOut/CheckOut";
import Order from "./pages/WebsitePages/Order/Order";
import WebLogin from "./pages/WebsitePages/LoginPage/Login";
import SignUp from "./pages/WebsitePages/SignUpPage/SignUp";
import About from "./pages/WebsitePages/AboutPage/About";
import ContactPage from "./pages/WebsitePages/ContactPage/Contact";
import PrivacyPolicy from "./pages/WebsitePages/PrivacyPolicyPage/PrivacyPolicy";
import OrderList from "./pages/AdminPages/OrderList/OrderList";
import ForgetPassword from "./pages/WebsitePages/ForgetPassword/ForgetPassword";
import DeliveryList from "./pages/AdminPages/DeliveryList/DeliveryList";
import OrdersCompletedList from "./pages/AdminPages/OrdersCompletedList/OrdersCompletedList";
import CustomerList from "./pages/AdminPages/CustomerList/CustomerList";
import MessageList from "./pages/AdminPages/MessageList/MessageList";
import BlogList from "./pages/AdminPages/BlogList/BlogList";
import ProfitList from "./pages/AdminPages/ProfitList/ProfitList";
import BalanceList from "./pages/AdminPages/BalanceList/BalanceList";
import NewBlog from "./pages/AdminPages/NewBlog/NewBlog";
import BlogPage from "./pages/WebsitePages/BlogPage/BlogPage";
import Loader from "./components/WebsiteComponents/Loader/Loader";
import ResolvedComplaints from "./pages/AdminPages/ResolvedComplaints/ResolvedComplaints";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import './darkMode.scss';
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Profile from "./pages/AdminPages/Profile/Profile";

const App = () => {
  const { loggedIn, adminStatus, user } = useSelector(
    (state) => state.cartReducer
  );

  const [adminList, setAdminList] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) ? JSON.parse(localStorage.getItem('currentUser')) : [];
    let crrentAdmin = JSON.parse(localStorage.getItem("AdminStatus"))
      ? JSON.parse(localStorage.getItem("AdminStatus"))
      : false;
    let currentLoggedIn = JSON.parse(localStorage.getItem("LoggedIn"))
      ? JSON.parse(localStorage.getItem("LoggedIn"))
      : false;
    dispatch({
      type: "setAdmin",
      adminStatus: crrentAdmin,
    });
    dispatch({
      type: "setLoggedIn",
      loggedIn: currentLoggedIn,
    });
    dispatch({
      type: "currentUser",
      payload: currentUser.user,
    });
    setLoading(false)
  }, []);

  if (loading) return <Loader />;

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <ToastContainer />
      <BrowserRouter>
        {adminStatus ? (
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
              <Route index element={<CustomerList />} />
            </Route>

            <Route path="/products">
              <Route index element={<ProductList />} />
              <Route path="newProduct" element={<NewProducts title="Add New Product" />} />
            </Route>

            <Route path="/blogs">
              <Route index element={<BlogList />} />
              <Route path="newBlogs" element={<NewBlog title="Add New Blog" />} />
            </Route>

            <Route path="/orders">
              <Route index element={<OrderList />} />
            </Route>

            <Route path="/delivery">
              <Route index element={<DeliveryList />} />
            </Route>

            <Route path="/orderscompleted">
              <Route index element={<OrdersCompletedList />} />
            </Route>

            <Route path="/profit">
              <Route index element={<ProfitList />} />
            </Route>

            <Route path="/balance">
              <Route index element={<BalanceList />} />
            </Route>

            <Route path="/messages">
              <Route index element={<MessageList />} />
            </Route>

            <Route path="/resolvedcomplaints">
              <Route index element={<ResolvedComplaints /> } />
            </Route>

            <Route path="/profile">
              <Route index element={<Profile /> } />
            </Route>

            <Route path="*" element={<Home />}></Route>
          </Routes>

        ) : loggedIn ? (
          <Routes>
            <Route path="/" index element={<Homepages />} />
            <Route path="/productInfo/:productid" element={<ProductInfo />}></Route>
            <Route path="/blogs" element={<BlogPage />}></Route>
            <Route path="/cartpage" element={<CartPage />}></Route>
            <Route path="/checkOut" element={<CheckOut />}></Route>
            <Route path="/order" element={<Order />} ></Route>
            <Route path="/weblogin" element={<WebLogin />}></Route>
            <Route path="/aboutpage" element={<About />}></Route>
            <Route path="/contactpage" element={<ContactPage />}></Route>
            <Route path="/privacypage" element={<PrivacyPolicy />}></Route>
            <Route path="*" element={<Homepages />}></Route>
          </Routes>

        ) : (
          <Routes>
            <Route path="/" index element={<Homepages />} />
            <Route
              path="/productInfo/:productid"
              element={<ProductInfo />}
            ></Route>
            <Route path="/weblogin" element={<WebLogin />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/aboutpage" element={<About />}></Route>
            <Route path="/contactpage" element={<ContactPage />}></Route>
            <Route path="/privacypage" element={<PrivacyPolicy />}></Route>
            <Route path="/blogs" element={<BlogPage />}></Route>
            <Route path="/forgetpassword" element={<ForgetPassword />}></Route>
            <Route path="*" element={<Homepages />}></Route>
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
