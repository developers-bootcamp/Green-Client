import img from '../../images/gifts.png'
import Grid from '@mui/material/Grid';
//import { useStyles } from './SignUp.styles'
import SignUpForm from './SignUpForm';
import { DialogContent, Link } from '@mui/material';
import { useState } from 'react';

const SignUp: React.FC = () => {

    const [open, setOpen] = useState(true);

   // const classes = useStyles()

    const handleOpenDialog = () => {
        setOpen(true)
    }

    const handleCloseDialog = () => {
        setOpen(false)
    }

    return <>
        {/* {!open && <Link onClick={handleOpenDialog} className={classes.signUpButton}>sign Up</Link >} */}
        <dialog onClose={handleCloseDialog} open={open} >
            <DialogContent>
                <Grid container maxWidth='md' item zeroMinWidth wrap="nowrap" >
                    <Grid container item zeroMinWidth wrap="nowrap" xs={8} md={8} >
                        <div>
                            <h2>Set up your account</h2>
                            <SignUpForm />
                        </div>
                    </Grid>
                    <Grid container item zeroMinWidth wrap="nowrap" xs={8} md={8}  >
                        <div>
                            <img src={img} alt="img"  />
                            <h3>Fill in your details so you can login later</h3>
                        </div>
                    </Grid>
                </Grid>
            </DialogContent>
        </dialog>
    </>
}

export default SignUp
