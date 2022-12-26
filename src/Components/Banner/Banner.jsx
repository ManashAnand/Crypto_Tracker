import Container from '@mui/material/Container';
import React from 'react';
import banner from './banner.jpg'
import './Banner.css'
import Carousel from './Carousel';




const Banner = () => {
      
  return (
    <div style={{backgroundImage: `url(${banner})`}} className="banner">
        <Container className="bannerContent">
          <div className="tagLine">
              <span className='headerTitle'>
                Crypto Tracker
              </span>
              <span className="headerTagLine">
                Get all the Info regarding your favorite Crypto Currency
              </span>
          </div>
          <Carousel/>
        </Container>
    </div>
  )
}

export default Banner
