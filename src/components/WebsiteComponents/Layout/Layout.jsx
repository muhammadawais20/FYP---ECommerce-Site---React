import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Layout.css';

const Layout = (props) => {
    return (
        <div className='layout-container'>
            <Header />
            <div className="content">
                {props.children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout;
