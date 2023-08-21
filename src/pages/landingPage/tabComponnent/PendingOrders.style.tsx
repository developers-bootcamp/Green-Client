import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { PALLETE } from "../../../config/config";

const MyTypography = styled(Typography)({
  
    backgroundColor: PALLETE.GRAY,
    color:PALLETE.BLUE,
    height: '150px',
    width: '200px',
    padding:'15px',

  });
  export {MyTypography}
