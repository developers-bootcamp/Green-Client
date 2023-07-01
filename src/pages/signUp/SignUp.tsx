import img from '../../images/gifts.png'
import Grid from '@mui/material/Grid';
import { useStyles } from './SignUp.styles'
import SignUpForm from './SignUpForm';
import { Container, DialogContent, Link } from '@mui/material';
import { useState } from 'react';

const SignUp: React.FC = () => {

    const [open, setOpen] = useState(false);

    const classes = useStyles()

    const handleOpenDiaolog = () => {
        setOpen(true)
    }

    const handleCloseDiaolog = () => {
        setOpen(false)
    }

    return <>
        {!open && <Link onClick={handleOpenDiaolog} className={classes.signInButton}>sign Up</Link >}
        <dialog onClose={handleCloseDiaolog} open={open} className={classes.dialog}>
            <DialogContent>
                <Grid container maxWidth='md' item zeroMinWidth wrap="nowrap" className={classes.mainGrid}>
                    <Grid container item zeroMinWidth wrap="nowrap" xs={8} md={8} className={classes.leftGrid} >
                        <div>
                            <h1>Set up your account</h1>
                            <SignUpForm />
                        </div>
                    </Grid>
                    <Grid container item zeroMinWidth wrap="nowrap" xs={4} md={4} className={classes.rightGrid}>
                        <div>
                            <img src={img} alt="img" className={classes.pic} />
                            <h3>Fill in your details so you can login later</h3>
                        </div>
                    </Grid>
                </Grid>
            </DialogContent>
        </dialog>
    </>
}

export default SignUp
