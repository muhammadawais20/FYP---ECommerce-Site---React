import React from 'react';
import {
    Link,
    NavLink
} from "react-router-dom";
import logo1 from '../../../resources/logo/Logo.png';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="container">
                <div className="footer-content">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-6 mb-50 text-center">
                            <div className="footer-widget text-center">
                                <div className="footer-logo">
                                    <img src={logo1} alt="logo" />
                                </div>
                                <div className="footer-text">
                                    <p>Quality has been our identity and key strength during from the starting of the business. We serve retailers throughout the Karachi. We now wish to bring the same level of quality to your doorsteps at an excellent price.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 mb-50 text-center">
                            <div className="footer-widget text-center">
                                <div className="footer-widget-heading">
                                    <h3>Useful Links</h3>
                                </div>
                                <ul>
                                    <li><NavLink className='links' style={{ textDecoration: 'none' }} as={Link} to={"/contactpage"}>Contact us</NavLink></li>
                                    <li><NavLink className='links' style={{ textDecoration: 'none' }} as={Link} to={"/privacypage"}>Privacy Policy</NavLink></li>
                                    <li><NavLink className='links' style={{ textDecoration: 'none' }} as={Link} to={"/blogs"}>Blogs</NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright-area">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 text-center text-lg-center">
                            <div className="copyright-text">
                                <p>Copyright &copy; 2022, All Rights Reserved <NavLink as={Link} to={"/"}>khaasdryfruits.me</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
