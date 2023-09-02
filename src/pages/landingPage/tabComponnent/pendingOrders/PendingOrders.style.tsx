import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material";
import { PALLETE } from "../../../../config/config"


const MyTypography = styled(Typography)({
  
    backgroundColor: PALLETE.GRAY,
    color:PALLETE.BLUE,
    height: '150px',
    width: '200px',
    padding:'15px',

  });
  const SortButton = styled(Button)({
  
    backgroundColor:PALLETE.WHITE,
    color:PALLETE.BLUE,
    borderRadius:'1%',
    marginLeft:'-95%',
    padding:'5px',

  });
  const NewOrderButton = styled(Button)({
  
    backgroundColor: PALLETE.ORANGE,
    color:PALLETE.WHITE,
    borderRadius:'5%',
    //marginLeft:'-95%',
    borderColor:PALLETE.ORANGE
  

  });
  export {MyTypography,SortButton,NewOrderButton}