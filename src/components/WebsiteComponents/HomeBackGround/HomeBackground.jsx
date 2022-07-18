import React from 'react';
import { Carousel } from 'react-bootstrap';
import firstBanner from '../../../resources/banners/banner-1.jpg';
import secondBanner from '../../../resources/banners/banner-2.jpg';
import thirdBanner from '../../../resources/banners/banner-3.png';
import "./HomeBackground.css"

function HomeBackground() {

    return (
        <div>
            <Carousel>
                <Carousel.Item className='carousel-container'>
                    <img
                        className="w-100 slider-img"
                        src={firstBanner}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <b></b><span className="section-title-main" style= {{fontSize: '97%'}}>
                            {/* <h1 style={{color:'#502d2e'}}>Buy Dry Fruits For Every Occasion</h1> */}
                        </span><b></b>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className='carousel-container'>
                    <img
                        className="w-100 slider-img"
                        src={secondBanner}
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item className='carousel-container'>
                    <img
                        className="w-100 slider-img"
                        src={thirdBanner}
                        alt="third slide"
                    />
                </Carousel.Item>

            </Carousel>
        </div>


    )
}

export default HomeBackground;
