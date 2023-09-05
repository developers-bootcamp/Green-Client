import SignUpForm from './SignUpForm';
import { useState } from 'react';
import img from '../../images/gifts.png';
import GlobalModal from '../../components/globalModal/GlobalModal';
import { useNavigate } from 'react-router';

const SignUp: React.FC = () => {

    const [open, setOpen] = useState(true);

    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false)
        navigate('/')
    }

    return <>
        <GlobalModal header={"Set up your account"} isOpen={open} handleClose={handleClose} img={img} sideTxt={"Fill in your details so you can login later"}>
            <SignUpForm />
        </GlobalModal>
    </>
}

export default SignUp
