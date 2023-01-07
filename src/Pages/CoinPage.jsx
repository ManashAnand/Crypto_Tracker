import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {CryptoToContext} from '../CryptoContext';
import CoinInfo from '../Components/CoinInfo/CoinInfo';
import './CoinPage.css';
import {numberWithCommas} from   '../Components/Banner/Carousel';
import LinearProgress from '@mui/material/LinearProgress';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const CoinPage = () => {
  const rank = "Rank: ‎  "
 const {id} =  useParams(); 
//  console.log(id)
const [coin,setCoin] =  useState();
 const { currency,symbol,user,watchlist,setAlert } = CryptoToContext();

 const fetchCoin = async () => {
    const data = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
    const JsonData = await data.json();
    setCoin(JsonData);
  }
  console.log(coin);
  useEffect(()=>{
    fetchCoin();
  },[])

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  const InWatchList = watchlist.includes(coin?.id);

  const AddToWatchList = async () => {
    const coinRef = doc(db,"watchlist",user.uid); 
    
    try{
      await setDoc(coinRef,
        {
          coins:watchlist?[...watchlist,coin?.id]:[ coin?.id],
        });

        setAlert({
          open: true,
          message: `${coin.name} Added to WatchList !`,
          type: "success"
        })

     } catch (error){
        setAlert({
          open: true,
          message:error.message,
          type: "error"
        })
     }
    
  }

  const removeFromWatchList = async () =>{
    const coinRef = doc(db,"watchlist",user.uid); 
    
    try{
      await setDoc(coinRef,
        {
          coins: watchlist.filter((watch) => watch!==coin?.id)
        },{
          merge:"true"
        });

        setAlert({
          open: true,
          message: `${coin.name} removed from WatchList !`,
          type: "success"
        })

     } catch (error){
        setAlert({
          open: true,
          message:error.message,
          type: "error"
        })
     }
    
  }

  return (
    <>
      <div className="container">
          <div className="sidebar">
              <img src={coin?.image.large} alt={coin?.name} height="200" style={{marginBottom:20}} />
         
          <div className="heading">
            {coin?.name}
          </div>

        

          <div  className="description">
          {(coin?.description.en.split(". ")[0])}.
          </div>
          <div className="marketData">
              <span style={{display:"flex",fontWeight:"bolder"}}>
                <div className="heading">
                  {rank}
                </div>
                {numberWithCommas(coin?.market_cap_rank)}
              </span>

              <span style={{display:"flex",fontWeight:"bolder"}}>
                <div className="heading">
                {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
                </div>
                {/* {coin?.market_cap_rank} */}
              </span>

              <span style={{display:"flex",fontWeight:"bolder"}}>
                <div className="heading">
                Market Cap:
                </div>
                {" "}{symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
              </span>

                { user && 
                  <div className='watchList' onClick={ InWatchList?removeFromWatchList:AddToWatchList}>
                    {InWatchList?"Remove from Watchlist":"Add to Watchlist"}
                    
                  </div>
                }
          </div>
          </div>
          <CoinInfo coin={coin}/>
      </div>
    </>
  )
}

export default CoinPage
