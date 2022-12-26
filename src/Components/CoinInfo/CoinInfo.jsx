import { createTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {CryptoToContext} from '../../CryptoContext';
import { ThemeProvider } from '@mui/material/styles';
import { dark } from '@material-ui/core/styles/createPalette';
import "./CoinInfo.css";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';


const CoinInfo = ({coin}) => {
    const [historicalData,setHistoricalData] = useState();
    const [days,setDays] = useState(1);
    const {currency} = CryptoToContext();

    const fetchHistoricalData = async () => {
        const data = await fetch( `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=${currency}&days=${days}`);
        const JsonData = await data.json();
        setHistoricalData(JsonData.prices);

    }

    useEffect(()=>{
        fetchHistoricalData();
    },[currency,days])

    const darkTheme = createTheme({
        palette:{
            primary:{
                main: "#fff"
            },
            type:"dark"
        }
    })

  return (
   <ThemeProvider theme={darkTheme}>
        <div className="mainContainer">

       
        <div className="container2">
            {
                !historicalData ? (
                    <Box sx={{ display: 'flex' }}>
                    <CircularProgress color='secondary'/>
                    </Box>
                ):(
                    <>
                    <Line
                        data={{
                            labels: historicalData.map((coin)=>{
                                let date = new Date(coin[0]);
                                let time =  
                                date.getHours() > 12
                                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                : `${date.getHours()}:${date.getMinutes()} AM`;
                            return days === 1 ? time : date.toLocaleDateString();
                            }),
                            datasets:[
                                {data:historicalData.map((coin)=>coin[1]),
                                label: `Price (Past ${days} Days ) in ${currency}` 
                                ,borderColor:'#EEBC1D'
                                }
                            ]
                        }}
                        options={{
                            elements:{
                                point:{
                                    radius:1,
                                },
                            },
                        }}
                    />
                    <div className="btnContainer">
                        <div className="btn" onClick={()=>{setDays(1)}}>24 Hours</div>
                        <div className="btn" onClick={()=>{setDays(30)}}>30 Days</div>
                        <div className="btn" onClick={()=>{setDays(90)}}>3 Months</div>
                        <div className="btn" onClick={()=>{setDays(365)}}>1 Year</div>
                    </div>
             
                    </>
                )
            }
        </div>
        
        </div>
   </ThemeProvider>
  )
}

export default CoinInfo
