import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
    dialog: {
        marginTop: '50px',
        border: '3px solid',
        borderRadius: '15px',
    },
    mainGrid: {
        backgroundColor: 'rgb(255, 255, 255)',
        padding: '0',
    },
    leftGrid: {
        // padding: '50px',
        borderTopLeftRadius: '15px',
        borderBottomLeftRadius: '15px',
    },
    rightGrid: {
        // padding: '50px',
        borderTopRightRadius: '15px',
        borderBottomRightRadius: '15px',
        backgroundColor: 'rgb(216, 223, 225)',
    },
    text: {
        margin: 'normal',
        borderRadius: ' 15px',
        width: '80%',
    },
    signInButton: {
        position: 'absolute',
        backgroundColor: 'EB9F6E !important',
        color: 'EB9F6E !important',
        top: '10px',
        borderRadius: '15px',
    },
    pic: {
        height: '60%',
        width: '90%',
        marginTop: '30%'
    },
})