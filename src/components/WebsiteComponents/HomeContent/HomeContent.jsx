import React from 'react';
import './HomeContent.css';
import logo from '../../../resources/logo/Logo.png';

const HomeContent = () => {

    return (
        <div className="container-xxxl HomePageContentWrapper">
                <span className="logo">
                  <img className='logoImage' src={logo} alt="Khaas Dry Fruit" />
                </span>   
                <p className='HomePageText'>Khaas Dry Fruit We deliver 100% fresh organic premium quality dry fruits and seeds across the country like a variety of badaam almonds. We also provide the best quality akhrot (walnuts), injeer (figs), kishmish sunderkhaani (raisins), chilgoza (pinenuts), pista (pistachios), mongphali Dana (peanuts), chuara (dried dates) and kaju (cashews), etc. online in Pakistan. We are highly efficient in online service and have received a terrific response from our customers because of the quality of nuts. The health of our customers is our supreme interest. Enjoy nature’s best food and buy dry fruits online in Pakistan with ease & convenience</p>
        </div>
    )
}

export default HomeContent;