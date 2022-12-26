import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import {CryptoToContext} from '../../CryptoContext';
import { Link } from "react-router-dom";
import './Carousel.css'

export function numberWithCommas(x){
 return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

const Carousel = () => {
    const [trending,setTrending] = useState([])

    const {currency , symbol} = CryptoToContext();

    const fetchTrendingCoins = async () => {
       const data = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`)
       const JsonData  = await data.json();
    //    console.log(JsonData);
       setTrending(JsonData);
    };

    useEffect(()=>{
        fetchTrendingCoins();
    },[currency])

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 5
        }
    }

    const items = trending.map((coin)=>{
        let profit = coin.price_change_percentage_24h>=0;

        return(
            <Link className="carouselItem"
            to={`/coins/${coin.id}`}>
            <img 
                src={coin.image}
                alt={coin.name}
                height="80"
                style={{marginBottom:10}}
            />
            <span>{coin.symbol}
                &nbsp;
                <span style={
                    {
                        color: profit>0 ? "rgb(14,203,129)" : "red",
                        fontWeight: 500,
                    }
                }>
                    {profit && "+"}{ coin.price_change_percentage_24h.toFixed(2)}%
                </span>
            </span>

            <span style={{fontSize: 22, fontWeight: 500}}>
                {symbol}
                {numberWithCommas(coin.current_price.toFixed(2))}
            </span>
            </Link>
        )
    })
  return (
    <div className='carousel'>
      <AliceCarousel mouseTracking infinite autoPlayInterval={1000} animationDuration={1500} disableButtonsControls disableDotsControls responsive={responsive} autoPlay items={items}/>
    </div>
  )
}

export default Carousel
