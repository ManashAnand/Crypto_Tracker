import * as React from 'react';
import {useState} from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { AppBar, Tab, Tabs } from '@mui/material';
import Login from './Login';
import Signup from './Signup';
import GoogleButton from 'react-google-button';
import "./AuthModel.css"
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { CryptoToContext } from '../../CryptoContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
    color: "white",
    borderRadius: 5
};

export default function AuthModel() {
  const [open, setOpen] = useState(false);

  const {setAlert} = CryptoToContext();
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = ( ) => { 
    signInWithPopup(auth,googleProvider).then(res => {
      setAlert({
        open: true,
        message:  `Sign Up Successfull. Welcome ${res.user.email}`,
        type:"success"
      });

      handleClose();
    }).catch(error => {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    })
    
  }

  return (
    <div>
        <Button 
        variant="contained"
        style={{
            width: 85,
            height: 40,
            marginLeft: 15,
            backgroundColor: "#EEBC1D",
        }}
        onClick={handleOpen}
        >
        Login
        </Button>

          {/* adding extra stuff */}

          <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
          <AppBar 
                position='static'
                style={{backgroundColor:"transparent", color:"white",borderRadius:"20px"}}
            >
                <Tabs 
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                style={{borderRadius: 5}}
                >
                    <Tab label="Login" />
                    <Tab label="Sign Up" />
                </Tabs>
            </AppBar>
            <>
            {value===0 && <Login handleClose={handleClose}/>}
            {value===1 && <Signup handleClose={handleClose}/>}
            <Box className='googleBtn'>
            <span className='or'>OR</span>
            <GoogleButton style={{width:"100%", outline:"none"}} onClick={signInWithGoogle}/>
            
             </Box>
            </>
          </Box>
        </Fade>
      </Modal>

          {/* till now */}


    
    </div>
  );
}


         
      