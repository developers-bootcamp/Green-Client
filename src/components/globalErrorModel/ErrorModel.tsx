import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Grid } from '@mui/material';
import { PALLETE } from '../../config/config';
import img from '../../images/errorMessage.png';
import { useSelector } from 'react-redux';
import  {store, RootState } from '../../redux/store';
import axios from 'axios';
import {clearError, setError} from '../../redux/slices/errorSlice';

export const ErrorModel:React.FC = () => {
const open = useSelector((state: RootState) => state.errorReducer?.isOpen || false);
console.log("open:",open)
const errorMessage = useSelector((state:RootState)=>state.errorReducer?.errorMessage || "error");
console.log("errorMessage:",errorMessage)

    const handleClose = () => {
     store.dispatch(clearError());
    };
  
    return (
      <div >
       <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <DialogTitle>Error</DialogTitle>
      <DialogContent id="alert-dialog-description">
        <Grid container>
          <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <DialogContentText>
              {errorMessage}
            </DialogContentText>
            <DialogActions sx={{ justifyContent: 'center', mt: 2 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: PALLETE.YELLOW,
                  borderRadius: '15px',
                  width: '35%',
                }}
                onClick={handleClose}
              >
                Close
              </Button>
            </DialogActions>
          </Grid>
          <Grid item xs={8} md={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'stretch' }}>
            <img src={img}  alt="Image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
      </div>
    );
  };