import img from '../../images/gifts.png'
import Grid from '@mui/material/Grid';
import { MainDialog, LeftGrid, RightGrid, MainGrid, Pic, SignUpButton, SignUpWrapper } from './SignUp.styles'
import SignUpForm from './SignUpForm';
import { DialogContent, Dialog, Link } from '@mui/material';
import { useState } from 'react';

const SignUp: React.FC = () => {

    const [open, setOpen] = useState(true);

    const handleOpenDialog = () => {
        setOpen(true)
    }

    const handleCloseDialog = () => {
        setOpen(false)
    }

    return <>
        {/*<SignUpButton> {!open && <Link onClick={handleOpenDialog} >sign Up</Link >} </SignUpButton> */}
        <MainDialog>
            <dialog onClose={handleCloseDialog} open={open}>
                <DialogContent>
                    <MainGrid>
                        <Grid container maxWidth='md' item zeroMinWidth wrap="nowrap" >
                            <LeftGrid>
                                <Grid container item zeroMinWidth wrap="nowrap" xs={8} md={8} >
                                    <div>
                                        <h2>Set up your account</h2>
                                        <SignUpForm />
                                    </div>
                                </Grid>
                            </LeftGrid>
                            <RightGrid>
                                <Grid container item zeroMinWidth wrap="nowrap" xs={4} md={4}  >
                                    <div>
                                        <Pic><img src={img} alt="img" /></Pic>
                                        <h3>Fill in your details so you can login later</h3>
                                    </div>
                                </Grid>
                            </RightGrid>
                        </Grid>
                    </MainGrid>
                </DialogContent>
            </dialog>
        </MainDialog >
    </>
}

export default SignUp