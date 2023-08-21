import { styled } from '@mui/system';
import { PALLETE } from '../../config/config';

export const MyImg = styled('img')({
    width: "100% ",
    marginBottom: "25%",
    marginTop: "70%",
})

export const MySideTxt = styled('div')({
    fontSize: "14px",
    fontWeight: "bold",
    textAlign: "center",
    paddingLeft: "25px",
    paddingRight: "25px",
    marginTop: 0,
})

export const LeftSide = styled('div')({
    width: "70% !important",
    display: 'inline-block',
    paddingBottom: "1rem",
})

export const RightSide = styled('div')({
    background: `${PALLETE.GRAY}`,
    height: "100% !important",
    width: "30% !important",
    position: "absolute",
    display: 'inline-block',
})