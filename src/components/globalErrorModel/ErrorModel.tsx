import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Grid } from '@mui/material';
import { PALLETE } from '../../config/config';
import img from '../../images/errorMessage.png';
import { useSelector } from 'react-redux';
import { store, RootState } from '../../redux/store';
import axios from 'axios';
import { clearError, setError } from '../../redux/slices/errorSlice';
import zIndex from '@mui/material/styles/zIndex';
import GlobalModal from '../globalModal/GlobalModal';
import { LeftSide, RightSide } from "../globalModal/GlobalModal.styles"
import { text } from 'node:stream/consumers';
import { borderColor } from '@mui/system';
import { styled } from '@mui/system';
import { Text } from '../globalModal/GlobalModal.styles';


export const ErrorModel: React.FC = () => {

  const open = useSelector((state: RootState) => state.errorReducer?.isOpen || false);
  // const open = true

  const errorMessage = useSelector((state: RootState) => state.errorReducer?.errorMessage || " something went wrong a error occurred");

  const handleClose = () => {
    store.dispatch(clearError());
  };

  return (<>
    <GlobalModal header={"error"} myWidth={'md'} myHeight={'25rem'} isOpen={open} handleClose={handleClose} img={img} sideTxt={'Oops - something went wrong'}>
      <Grid container textAlign='center' justifyContent='center' alignItems='center'>
        <Text>{errorMessage} - please try again later or contact our support team at: support@gmail.com</Text>
        <Button
          onClick={handleClose}
          sx={{ backgroundColor: `${PALLETE.ORANGE} !important`, width: '10rem', marginTop: '5rem', marginBottom: '2rem' }}
          variant="contained" >
          close
        </Button>
      </Grid>
    </GlobalModal>
  </>
  );
};