import * as React from 'react';
import { styled } from '@mui/system';
import { PALLETE } from '../../config/config';
import { Button } from '@mui/material';
import { hover } from '@testing-library/user-event/dist/hover';

const MyButton = styled(Button)({
  
  backgroundColor: PALLETE.ORANGE,
  color:PALLETE.ORANGE

  
});
export{ MyButton}