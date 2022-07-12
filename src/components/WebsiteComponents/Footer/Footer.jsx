import React from 'react';
import {
    Link,
    NavLink
} from "react-router-dom";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import './Footer.css';


const Footer = () => {
    return (
        <footer className="page-footer font-small blue pt-4 mt-5" >
            <div className="container-fluid text-center text-md-left">
                <div className="row">
                    <div className="col-md-6 mt-md-0 mt-3">
                        <h5 className='Title'>KhasDryFruits</h5>
                        <p>The world is growing digital day by day. At KhasDryFruits, we make it easier for you to buy these tasty and nutritious dried fruits online. </p>
                        <p><NavLink className="navlinkStyle"  as={Link} to={"/"}><EmailIcon />info@KhasDryFruits.com</NavLink></p>
                        <p><NavLink className="navlinkStyle" as={Link} to={"/"}><LocalPhoneIcon/>021-9291690</NavLink></p>
                        <p>Follow Us</p>
                        <NavLink className='SocialLinks' as={Link} to={"/"}><FacebookIcon  /></NavLink>
                        <NavLink className='SocialLinks' as={Link} to={"/"}><InstagramIcon /></NavLink>
                        <NavLink className='SocialLinks' as={Link} to={"/"}><YouTubeIcon /></NavLink>
                        <NavLink className='SocialLinks' as={Link} to={"/"}><TwitterIcon /></NavLink>

                    </div>

                    {/* <hr className="clearfix w-100 d-md-none pb-0" /> */}

                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className='Title'>About KhasDryFruits</h5>
                        <ul className="list-unstyled footerLinks" >
                            {/* <li><NavLink className='links' as={Link} to={"/aboutpage"}>About us</NavLink></li>
                            <hr /> */}
                            <li><NavLink className='links' as={Link} to={"/contactpage"}>Contact us</NavLink></li>
                            <hr />
                            <li><NavLink className='links' as={Link} to={"/privacypage"}>Privacy Policy</NavLink></li>
                            <hr />
                            <li><NavLink className='links' as={Link} to={"/"}>Blog</NavLink></li>
                            <hr />
                        </ul>
                    </div>

                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className='Title'>My Account</h5>
                        <ul className="list-unstyled footerLinks">
                            <li><NavLink className='links' as={Link} to={"/weblogin"}>Login</NavLink></li>
                            <li><NavLink className='links' as={Link} to={"/order"}>Order History</NavLink></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-copyright text-center py-3 footerEnd">© 2022 Copyright: 
                <NavLink as={Link} to={"/"} >KhassDryFruits.com</NavLink>
            </div>

        </footer>
    )
}

export default Footer;
