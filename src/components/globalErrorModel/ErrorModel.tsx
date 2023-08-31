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
const errorMessage = useSelector((state:RootState)=>state.errorReducer?.errorMessage || " something went wrong, a error occurred");
console.log("errorMessage:",errorMessage)

    const handleClose = () => {
     store.dispatch(clearError());
    };
  
    return (
      <Dialog fullWidth sx={ {maxHeight: "60vh",top: "13vh"}}  open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogContent sx={{ p: 0, height: '45rem' }} style={{ borderRadius: '100px' }}>
          <LeftSide>
              <DialogTitle sx={{ fontSize: 30, pl: "3rem", paddingLeft: "3rem" }}>Error</DialogTitle>
              <DialogContent style={{ paddingRight: "3rem", paddingLeft: "3rem" }}>{errorMessage}</DialogContent>
              <Button onClick={handleClose} style={{color:'white', textAlign: "center",paddingLeft: "45px",paddingRight: "45px",marginLeft:140, backgroundColor: 'orange', borderColor: 'orange', position: 'absolute' }}>Close</Button>
          </LeftSide >
          <RightSide>
              <MyImg src={img} alt={img}></MyImg>
          </RightSide>
      </DialogContent>
  </Dialog>
   //   <GlobalModal isOpen={open} handleClose={handleClose} header="Error" img={img} sideTxt={""}>{errorMessage}</GlobalModal>
    //   <div >
    //    <Dialog
    //   open={open}
    //   onClose={handleClose}
    //   aria-labelledby="alert-dialog-title"
    //   aria-describedby="alert-dialog-description"
    //   sx={{
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //   }}
    // >
    //   <DialogTitle>Error</DialogTitle>
    //   <DialogContent id="alert-dialog-description">
    //     <Grid container>
    //       <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    //         <DialogContentText>
    //           {errorMessage}
    //         </DialogContentText>
    //         <DialogActions sx={{ justifyContent: 'center', mt: 2 }}>
    //           <Button
    //             variant="contained"
    //             sx={{
    //               backgroundColor: PALLETE.YELLOW,
    //               borderRadius: '15px',
    //               width: '35%',
    //             }}
    //             onClick={handleClose}
    //           >
    //             Close
    //           </Button>
    //         </DialogActions>
    //       </Grid>
    //       <Grid item xs={8} md={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'stretch' }}>
    //         <img src={img}  alt="Image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    //       </Grid>
    //     </Grid>
    //   </DialogContent>
    // </Dialog>
    //   </div>
    );
  };
