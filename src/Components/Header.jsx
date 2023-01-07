import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './Header.css';
import {useNavigate} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import {CryptoToContext} from '../CryptoContext'
import AuthModel from './Authentication/AuthModel';
import UserSidebar from './Authentication/UserSidebar';

const Header = () => {
  const {currency,setCurrency,user} = CryptoToContext();
 
  const darkTheme = createTheme({
    palette: {
      primary:{
        main:"#fff"
      },
      mode: 'dark',
    },
  });
 
  const navigate = useNavigate();
  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
              <span onClick={()=>{navigate("/")}} className='appTitle' variant="h6">
                Crypto Tracker
              </span> 
              <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              style={{ width: 100, height: 40, marginLeft: 15 }}
              onChange={(e) => setCurrency(e.target.value)}
            >
                <MenuItem value={'USD'}>USD</MenuItem>
                <MenuItem value={'INR'}>INR</MenuItem>
              </Select>
          {  user ? <UserSidebar/> : <AuthModel/>}
       
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
    </>
  )
}

export default Header
