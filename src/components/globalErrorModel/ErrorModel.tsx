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
import { LeftSide, RightSide } from "../globalModal/GlobalModal.styles"
import { text } from 'node:stream/consumers';
import { borderColor } from '@mui/system';
import { styled } from '@mui/system';


export const ErrorModel:React.FC = () => {
  
const open = useSelector((state: RootState) => state.errorReducer?.isOpen || false);
console.log("open:",open)
const errorMessage = useSelector((state:RootState)=>state.errorReducer?.errorMessage || " something went wrong a error occurred");
console.log("errorMessage:",errorMessage)

    const handleClose = () => {
     store.dispatch(clearError());
    };
     const MyImg = styled('img')({
      width: "100%",
  })
  
    return (
      <Dialog fullWidth sx={ {maxHeight: "40vh",top: "23vh"}}  open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogContent sx={{ p: 0, height: '45rem'}} style={{ borderRadius: '100px' }}>
          <LeftSide>
              <DialogTitle sx={{ fontSize: 30, pl: "3rem", paddingLeft: "3rem" }}>Error</DialogTitle>
              <DialogContent style={{ paddingRight: "3rem", paddingLeft: "3rem" }}>{errorMessage}</DialogContent>
            <Button
      onClick={handleClose}
      style={{ color: 'white', textAlign: "center", paddingLeft: "45px", paddingRight: "45px",   backgroundColor: 'orange', 
       borderColor: 'orange',position: 'absolute', bottom: '0', left: '40%', transform: 'translateX(-50%)', marginBottom: '40px', 
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
