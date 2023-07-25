import axios from 'axios';
import * as yup from 'yup';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useFormik } from 'formik';
import React, { useState } from "react";
import { SignUpButton, Text, SignUpWrapper } from "./SignUp.styles";
import { useNavigate } from "react-router-dom";
import { Autocomplete, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { PALLETE } from '../../config/config';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/Store';
import ICurrencyState from '../../interfaces/ICurrencyState';

const validationSchema = yup.object({
    fullName: yup.string().required('Name is required').max(20, 'Name cannot be longer than 20 letters'),
    companyName: yup.string().required('Company Name is required').max(20, 'Company Name cannot be longer than 20 letters'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    acceptTerms: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
});

const SignUpForm: React.FC = () => {

    const dispatch = useAppDispatch();


    const listOfCurrencies: string[] = useSelector<RootState, ICurrencyState>(state => state.currencyReducer).currencies;

    const [currency, setCurrency] = React.useState("DOLLAR");

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
            companyName: '',
            acceptTerms: false,
        },
        validationSchema,
        onSubmit: (values) => {
            async function signUpRequest() {
                try {
                    const res = await axios.post(`http://localhost:8081/user/signUp?fullName=${values.fullName}&companyName=${values.companyName}&email=${values.email}&password=${values.password}`);
                    console.log(values);
                    swal("you sign up seccessfully", "good", "success");
                    navigate("/landingPage")
                    return (res.data);
                } catch (error) {
                    console.log(values);
                    swal("you have a error", `${error}`, "error");
                    navigate("/login")
                }
            }
            signUpRequest();
        }
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="fullName">Full Name</label><br />
                <Text><TextField margin='normal' id="fullName" name="fullName"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                    helperText={formik.touched.fullName && formik.errors.fullName}
                /></Text>

                <br /><label htmlFor="companyName">Company Name</label><br />
                <Text><TextField margin='normal' id="companyName" name="companyName"
                    value={formik.values.companyName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                    helperText={formik.touched.companyName && formik.errors.companyName}
                /></Text>

                <Autocomplete
                    fullWidth
                    value={currency}
                    defaultValue={currency}
                    options={listOfCurrencies.map((c: string) => c)}
                    inputValue={currency}
                    onInputChange={(event, newInputValue) => {
                        setCurrency(newInputValue);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} />
                    )}
                />

                <br /><label htmlFor="email">Email Address</label><br />
                <Text><TextField margin='normal' id="email" name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                /></Text>

                <br /><label htmlFor="password">Password</label><br />
                <Text><TextField id="password" name="password" margin='normal' type={showPassword ? 'text' : 'password'} autoComplete="current-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleShowPassword} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                /></Text>

                <FormControlLabel
                    control={
                        <Checkbox
                            id="acceptTerms"
                            name="acceptTerms"
                            checked={formik.values.acceptTerms}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            color="primary"
                        />
                    }
                    label={<span>
                        I agree to the <a href="http://localhost:3000/">Terms of service</a> and <a href="http://localhost:3000/">Privacy Policy</a>
                    </span>}
                />
                {formik.touched.acceptTerms && formik.errors.acceptTerms ? (
                    <div>{formik.errors.acceptTerms}</div>
                ) : null}
                <br />

                <SignUpWrapper>
                    <Button
                        sx={{ backgroundColor: `${PALLETE.YELLOW} !important`, }}
                        type="submit" variant="contained" >
                        Sign Up
                    </Button>
                </SignUpWrapper>
            </form >
        </div >
    );
};

export default SignUpForm;