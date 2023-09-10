import * as yup from 'yup';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useFormik } from 'formik';
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { TextField, FormHelperText, IconButton, InputAdornment, Grid, Select, MenuItem } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { PALLETE } from '../../config/config';
import { SignUpWrapper } from "./SignUp.styles";
import ICurrencyState from '../../interfaces/ICurrencyState';
import { RootState, store } from '../../redux/store';
import { useSelector } from 'react-redux';
import { signUp } from '../../apiCalls/userCalls';
import { setCompanyId } from '../../redux/slices/CompanyIdSlice';
import { setRole } from '../../redux/slices/RoleSlice';

const validationSchema = yup.object({
    fullName: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    companyName: yup.string().required('Company Name is required'),
    acceptTerms: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
});

const SignUpForm: React.FC = () => {

    const listOfCurrencies: string[] = useSelector<RootState, ICurrencyState>(state => state.currencyReducer).currencies;

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
            companyName: '',
            currency: '',
            acceptTerms: false,
        },
        validationSchema,
        onSubmit: (values: { fullName: string, companyName: string, email: string, password: string, currency: string, acceptTerms: boolean }) => {
            async function signUpRequest() {
                try {
                    const res = await signUp(values.fullName, values.companyName, values.email, values.password, values.currency)
                    sessionStorage.setItem("token", res.data.token)
                    store.dispatch(setRole(res.data.role));
                    store.dispatch(setCompanyId(res.data.companyId));
                    swal("you are successfully signed up", "good", "success");
                    navigate("/");
                } catch (error) {
                    swal("you have a error", `${error}`, "error");
                    navigate("/landingPage")
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
                <FormHelperText>Full Name</FormHelperText>
                <TextField id="fullName" name="fullName" fullWidth margin='normal'
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                    helperText={formik.touched.fullName && formik.errors.fullName}
                />

                <Grid item container xs={12} sm={12}>
                    <Grid item xs={12} sm={8} sx={{ pr: 2 }}>
                        <FormHelperText>Company Name</FormHelperText>
                        <TextField id="companyName" name="companyName" fullWidth margin='normal'
                            value={formik.values.companyName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                            helperText={formik.touched.companyName && formik.errors.companyName}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <FormHelperText>currency</FormHelperText>
                        <Select fullWidth sx={{marginTop:'15px'}} 
                            onChange={(e: { target: { value: string; }; }) => {
                                formik.values.currency = typeof e.target.value === 'string' ? e.target.value : ""
                                e.target.value = formik.values.currency
                            }}>
                            {listOfCurrencies.map((currency) => <MenuItem value={currency}>{currency}</MenuItem>)}
                        </Select>
                    </Grid>
                </Grid>

                <FormHelperText>Password</FormHelperText>
                <TextField id="password" name="password" fullWidth margin='normal' type={showPassword ? 'text' : 'password'} autoComplete="current-password"
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
                />

                <FormHelperText>Email Address</FormHelperText>
                <TextField id="email" name="email" fullWidth margin='normal'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />

                <br /><FormControlLabel
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
                        sx={{ backgroundColor: `${PALLETE.YELLOW} !important`, width: '10rem', marginTop: '20px' }}
                        type="submit" variant="contained" >
                        Sign Up
                    </Button>
                </SignUpWrapper>
            </form >
        </div >
    );
};

export default SignUpForm;