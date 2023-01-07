import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { CryptoToContext } from "../../CryptoContext";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../firebase";

const Login = ({handleClose}) => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const { setAlert } = CryptoToContext();

  const handleSubmit = async () => {
     if(!email || !password)
     {
      setAlert({
        open: true,
        message: "Please fill all the Fields",
        type: "error"
      });
      return;
     }

     try {
        const result = await signInWithEmailAndPassword(auth,email,password);

        setAlert({
          open:true,
          message: `LogIn successfull. Welcome ${result.user.email}`,
          type: "success"
        });
  
        handleClose();
    } catch (error) {
      setAlert({
        open:true,
        message: error.message,
        type: "error"
      });
    }

  }

  return (
    <>
         <Box
        p={3}
        style={{ display:"flex", flexDirection:"column", gap:"20px"}}
        >
            <TextField
                variant="outlined"
                type="email"
                label="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
            />
            <TextField
                variant="outlined"
                type="password"
                label="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
            />
           
            <Button
            variant="contained"
            size="large"
            style={{backgroundColor:"#EEBC1D"}}
            onClick={handleSubmit}
            >
            LogIn
            </Button>
        </Box> 
    </>
  )
}

export default Login
