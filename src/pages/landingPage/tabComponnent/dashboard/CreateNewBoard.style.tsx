import { styled } from '@mui/system';
import { PALLETE } from '../../../../config/config';
import Box from '@mui/material/Box';

export const MyBox = styled(Box)({
    backgroundColor: PALLETE.GRAY,
    display: 'flex',
    alignItems:'center',
    justifyContent:'center',
});

export const MyLabel = styled('label')({
   fontSize: 20,
   paddingTop: 100,
}); 

export const MySpan = styled('span')({
    fontSize: 60,
    fontWeight: 400,
    paddingTop: 100,
    paddingRight: 10,
 }); 