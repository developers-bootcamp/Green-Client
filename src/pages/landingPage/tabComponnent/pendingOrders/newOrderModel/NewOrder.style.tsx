import * as React from 'react';
import { styled } from '@mui/system';
import { PALLETE } from '../../../../../config/config';
import { Button } from '@mui/material';

const MyButton = styled(Button)({
  
  backgroundColor: PALLETE.ORANGE,
  color:PALLETE.GRAY

  
});
const AddButton = styled(Button)({
  
 width:'100%',
 backgroundColor:PALLETE.BLUE

  
});
const BaloonImg = styled('div')({
  
height:'100%',
position:'absolute',
  backgroundColor:PALLETE.GRAY
 
   
 });
export{ MyButton,AddButton, BaloonImg}