import { Snackbar } from "@mui/material";
import React from "react";
import { CryptoToContext } from "../../CryptoContext";
import AlertMsg from '@mui/material/Alert';


const Alert = () => {
  const { alert, setAlert } = CryptoToContext();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ open: false });
  };

  return (
    <>
      <Snackbar open={alert.open} autoHideDuration={4000} onClose={handleClose}>
        <AlertMsg
          onClose={handleClose}
          elevation={10}
          variant="filled"
          severity={alert.type}
        >
            {alert.message}
        </AlertMsg>
      </Snackbar>
    </>
  );
};

export default Alert;
