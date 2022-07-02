import React from 'react';
import './sidebar.scss';
import logo from '../../../logo.png';
import {auth} from '../../../config/firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
// import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import FaceIcon from '@mui/icons-material/Face';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import StoreSharpIcon from '@mui/icons-material/StoreSharp';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ArticleIcon from '@mui/icons-material/Article';
import FeedbackIcon from '@mui/icons-material/Feedback';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppTwoToneIcon from '@mui/icons-material/ExitToAppTwoTone';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        <div className='sidebar'>
            <div className="topDashboard">
                <Link to="/adminHome" style={{ textDecoration: "none" }}>
                    <span className="logo">
                        <img src={logo} alt="Khas Dry Fruit" />
                    </span>
                </Link>
            </div>

            <div className="centerDashboard">
                <ul>
                    <p className="title">MAIN</p>
                    <Link to="/adminHome" style={{ textDecoration: "none" }}>
                        <li>
                            <DashboardIcon className='icon' />
                            <span>Dashboard</span>
                        </li>
                    </Link>

                    <p className="title">ADMINS</p>
                    <Link to="/admins" style={{ textDecoration: "none" }}>
                        <li>
                            <ManageAccountsIcon className='icon' />
                            <span>Admins</span>
                        </li>
                    </Link>

                    <Link to="/users" style={{ textDecoration: "none" }}>
                        <li>
                            <PeopleOutlinedIcon className='icon' />
                            <span>Users</span>
                        </li>
                    </Link>

                    <Link to="/customers" style={{ textDecoration: "none" }}>
                        <li>
                            <FaceIcon className='icon' />
                            <span>Customers</span>
                        </li>
                    </Link>

                    <Link to="/products" style={{ textDecoration: "none" }}>
                        <li>
                            <StoreSharpIcon className='icon' />
                            <span>Products</span>
                        </li>
                    </Link>

                    <Link to="/orders" style={{ textDecoration: "none" }}>
                        <li>
                            <CreditCardIcon className='icon' />
                            <span>Orders</span>
                        </li>
                    </Link>

                    <Link to="/delivery" style={{ textDecoration: "none" }}>
                        <li>
                            <LocalShippingIcon className='icon' />
                            <span>Delivery</span>
                        </li>
                    </Link>

                    <Link to="/orderscompleted" style={{ textDecoration: "none" }}>
                        <li>
                            <DoneAllIcon className='icon' />
                            <span>Orders Completed</span>
                        </li>
                    </Link>


                    <p className="title">IMPORTANT</p>
                    <li>
                        <InsertChartIcon className='icon' />
                        <span>Stats</span>
                    </li>

                    <li>
                        <NotificationsNoneIcon className='icon' />
                        <span>Notificatios</span>
                    </li>

                    <p className="title">OTHER</p>

                    <li>
                        <ArticleIcon className='icon' />
                        <span>Blogs</span>
                    </li>

                    <Link to="/messages" style={{ textDecoration: "none" }}>
                    <li>
                        <FeedbackIcon className='icon' />
                        <span>Complaints</span>
                    </li>
                    </Link>

                    <p className="title">USER</p>
                    <li>
                        <AccountCircleOutlinedIcon className='icon' />
                        <span>Profile</span>
                    </li>

                    <li>
                        <ExitToAppTwoToneIcon className='icon' />
                        <span onClick={handleLogout}>Logout</span>
                    </li>
                </ul>
            </div>

            {/* <div className="bottomDashboard">
                <div className="panelMode"></div>
                <div className="panelMode"></div>
            </div> */}

        </div>
    );
};

export default Sidebar;