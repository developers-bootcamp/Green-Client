import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Grid } from '@mui/material';
import { PALLETE } from '../../config/config';
import img from '../../images/errorMessage.png';
import { useSelector } from 'react-redux';
import  {store, RootState } from '../../redux/store';
import axios from 'axios';
import {clearError, setError} from '../../redux/slices/errorSlice';
import zIndex from '@mui/material/styles/zIndex';
import GlobalModal from '../globalModal/GlobalModal';
import { LeftSide, MyImg, MySideTxt, RightSide } from "../globalModal/GlobalModal.styles"
import { text } from 'node:stream/consumers';
import { borderColor } from '@mui/system';


export const ErrorModel:React.FC = () => {
  
const open = useSelector((state: RootState) => state.errorReducer?.isOpen || true);
console.log("open:",open)
const errorMessage = useSelector((state:RootState)=>state.errorReducer?.errorMessage || " something went wrong a error occurred");
console.log("errorMessage:",errorMessage)

    const handleClose = () => {
     store.dispatch(clearError());
    };
  
    return (
      <Dialog fullWidth sx={ {maxHeight: "60vh",top: "13vh"}}  open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogContent sx={{ p: 0, height: '45rem'}} style={{ borderRadius: '100px' }}>
          <LeftSide>
              <DialogTitle sx={{ fontSize: 30, pl: "3rem", paddingLeft: "3rem" }}>Error</DialogTitle>
              <DialogContent style={{ paddingRight: "3rem", paddingLeft: "3rem" }}>{errorMessage}</DialogContent>
            <Button
      onClick={handleClose}
      style={{ color: 'white', textAlign: "center", paddingLeft: "45px", paddingRight: "45px",   backgroundColor: 'orange', 
       borderColor: 'orange',position: 'absolute', bottom: '0', left: '40%', transform: 'translateX(-50%)', marginBottom: '70px', 
      }}
    >
      Close
    </Button>
          </LeftSide >
          <RightSide>
              <MyImg src={img} alt={img}></MyImg>
          </RightSide>
      </DialogContent>
  </Dialog>
    );
  };
