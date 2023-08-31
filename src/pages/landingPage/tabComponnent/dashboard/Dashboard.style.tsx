import { styled } from '@mui/system';
import { PALLETE } from '../../../../config/config';

export const MyDiv = styled('div')({
    display: 'flex',
    alignItems:'center',
    justifyContent:'center',
    fontSize: 20,
    paddingTop: 130,
});

export const Item = styled('div')({
    backgroundColor: PALLETE.GRAY,
    padding: 5,
    borderRadius: 15,
    height: 300,
  });