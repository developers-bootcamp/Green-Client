import { makeStyles } from '@mui/styles';
import { PALLETE } from '../config/config';
const useStylesForTable = makeStyles((color) => ({
    sideColor: {
        border: " 5px",
        borderLeftStyle: "solid",
        borderLeftColor: `${PALLETE.RED} !important`,
        padding: "0px!important",
        height: "10px!important",

    },
    try: {
        fontWeight: 'bold !important', paddingTop: '0px!important',
        paddingBottom: '0px!important',
        paddingRight: '7px!important',
        paddingLeft: '7px!important',
        height: "40px!important",
        color:"gray!important",

    },
    try2: {
        backgroundColor:"rgb(220,220,220)!important",
        paddingTop: '0px!important',
        paddingBottom: '0px!important',
        paddingRight: '7px!important',
        paddingLeft: '7px!important', borderBottom: '5px solid #FFFF!important'
    }
    ,try3:{
        
        // width:"1000px!important",
        // height:"300px!important",

    }
}));
export default useStylesForTable;