import { PALLETE } from '../../config/config';
import styled from '@emotion/styled';
import { Padding } from '@mui/icons-material';
import { Button, TableCell, TableHead, TableRow } from '@mui/material';
const TableRows = styled(TableRow)({
    border: "5px",
    borderLeftStyle: "solid",
    borderLeftColor: `${PALLETE.RED} !important`,
    padding: "0px!important",
    height: "10px!important",
    backgroundColor: "white!important",

})
const TableCells = styled(TableCell)({
    border: " 5px",
    backgroundColor: "rgb(220,220,220)!important",
    paddingTop: '0px!important',
    paddingBottom: '0px!important',
    paddingRight: '7px!important',
    paddingLeft: '7px!important', borderBottom: '5px solid #FFFF!important',
    borderRight: '5px solid #FFFF!important',
    Padding:"0pxIimportant"
})
const Head = styled(TableCell)({
    fontWeight: 'bold !important', paddingTop: '0px!important',
    paddingBottom: '0px!important',
    paddingRight: '7px!important',
    paddingLeft: '7px!important',
    height: "30px!important",
    color: "gray!important",
    display: "table-cell!important",
})
const Row = styled(TableRow)({
    color: "white!important"
})
const Image = styled('h1')({
    left: "80px",
    position: "absolute",
    top: "55px",
    marginTop: "0px",
    width: "20px",
    height: "20px",
    fontSize: "10px",
    color: `${PALLETE.RED}`,
    fontFamily: "-webkit-body"
})
const Img = styled('img')({
    left: "-15px",
    position: "absolute",
    top: "-50px",
    marginTop: "0px",
    width: "15px",
    height: "15px",
})
const AddButtons = styled(Button)({
    border: "5px",
    backgroundColor: "rgb(220,220,220)!important",
    paddingTop: '0px!important',
    paddingBottom: '0px!important',
    paddingRight: '7px!important',
    paddingLeft: '0px!important', borderBottom: '5px solid #FFFF!important',
    borderRight: '5px solid #FFFF!important',
    borderLeftStyle: "solid",
    borderLeftColor: `${PALLETE.RED} !important`,
    padding: "0px!important",
    height: "30px!important",
    width:"1130px!important",
    opacity: "0.4",
    color:"black!important",
    marginBottom:"0px!important",
  
  
})
export { TableRows, Image, TableCells, Head, Row, AddButtons,Img }

