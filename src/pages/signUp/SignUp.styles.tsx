import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
    dialog: {
        marginTop: '50px',
        border: '3px solid',
        borderRadius: '15px',
    },
    mainGrid: {
        // textAlign: 'center'
    },
    leftGrid: {
        textAlign: 'start',
        justifyItems: 'center',
        borderTopLeftRadius: '15px',
        borderBottomLeftRadius: '15px',
        paddingRight:'50px',
    },
    rightGrid: {
        textAlign: 'center',
        borderTopRightRadius: '15px',
        borderBottomRightRadius: '15px',
        backgroundColor: 'rgb(216, 223, 225)',
    },
    text: {
        margin: 'normal',
        borderRadius: ' 15px',
        width: '80%',
    },
    signUpWrapper: {
        textAlign: 'end'
    },
    signUpButton: {
        position: 'absolute',
        backgroundColor: 'EB9F6E !important',
        color: 'EB9F6E !important',
        bottom: '140px',
        left:'50%',
        width: '40%',
        borderRadius: '15px',
    },
    pic: {
        height: '60%',
        width: '90%',
        marginTop: '30%'
    },
})