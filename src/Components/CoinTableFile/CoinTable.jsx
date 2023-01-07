import React, { useEffect, useState } from 'react'
import {CryptoToContext} from '../../CryptoContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import "./CoinTable.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import LinearProgress from '@mui/material/LinearProgress';
import {useNavigate} from "react-router-dom";
import {numberWithCommas} from '../Banner/Carousel'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const CoinTable = () => {
    const navigate = useNavigate();
    
    
    const [search,setSearch] = useState("");
    const [page,setPage] = useState(1);

    const {currency,symbol,coins,loading,fetchCoins} = CryptoToContext();

   
    useEffect(()=>{
        fetchCoins();
    },[currency])

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type:"dark",
        },
    })
    const handleSearch = () => {
        return coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        );
      };
    
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Container style={{textAlign:"center"}}>
            <div className="typoGraphy" variant="h4">
                Cryptocurrency Prices by Market Cap
            </div>
            <Box 
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                >
                    <TextField sx={{ input: { color: 'white' } }}  inputProps={{ className: "textField" }} id="outlined-basic" label="Search for a Cryto Currency..." variant="outlined" 
                     style={{marginBottom:20,width:"100%",
                    //  border:"0.1px solid white",
                     color:"white"} }
                      InputLabelProps={{ style: { color: '#fff' },  }} 
                      onChange={(e)=>{setSearch(e.target.value)}}

                    />
                    
                </Box>

                <TableContainer>
                    {
                        loading? (
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress style={{backgroundColor:"gold"}} />
                            </Box>
                        ):(
                            <Table>
                                <TableHead style={{backgroundColor:"#EEBC1D"}}>
                                    <TableRow>
                                        {["Coin","Price","24hr Change","Market Cap"].map((head) => (
                                            <TableCell style={{
                                                color:"black",
                                                fontWeight:"700",
                                                fontFamily:"Montserrat"
                                            }} key={head}
                                            align={head==='Coin'?"":"right"}
                                            >
                                                {head}
                                            </TableCell>
                                        )
                                        )}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {handleSearch()
                                    .slice((page-1)*10,(page-1)*10+10)
                                        .map((row)=>{
                                        const profit = row.price_change_percentage_24h>0;
                                        
                                        return (
                                            <TableRow
                                                onClick={()=>{navigate(`/coins/${row.id}`)}}
                                                className="individualItems"
                                                key={row.name}
                                            >
                                                <TableCell component='th' scope='row'
                                                style={{
                                                    display:"flex",
                                                    gap:15,
                                                }}
                                                >
                                                <img
                                                src={row.image}
                                                alt={row.name}
                                                height="50"
                                                style={{marginBottom:10}}/>
                                                <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                                                </TableCell>

                                                <TableCell align="right" color='white'>
                          <span style={{color:"white"}}>
                           {symbol}
                          </span>
                          <span style={{color:"white"}}>
                          {numberWithCommas(row.current_price.toFixed(2))}
                          </span>
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                        <span style={{color:"white"}}>
                            {symbol}
                         </span>
                         <span style={{color:"white"}}>
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                          </span>
                        </TableCell>


                                            </TableRow>
                                        )
                                    })}
                                </TableBody>

                            </Table>
                        )
                    }
                </TableContainer>

                <Stack spacing={2}>
                    <Pagination count={(handleSearch()?.length/10).toFixed(0)}
                    style={{
                        padding:20,
                        width:"100%",
                        display:"flex",
                        justifyContent:"center",
                    }}
                        color="secondary"
                        onChange={(_,value)=>{
                            setPage(value);
                            window.scroll(0,450);
                        }}
                     />
                </Stack>
      </Container>
      </ThemeProvider>
    </>
  )
}

export default CoinTable;
