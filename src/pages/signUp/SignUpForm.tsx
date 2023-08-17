import * as yup from 'yup';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useFormik } from 'formik';
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Autocomplete, FormHelperText, IconButton, InputAdornment, Grid } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { PALLETE } from '../../config/config';
import { SignUpWrapper, Text } from "./SignUp.styles";
import ICurrencyState from '../../interfaces/ICurrencyState';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { signUp } from '../../apiCalls/userCalls';
import { fontSize } from '@mui/system';

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
        onSubmit: (values: { fullName: string, companyName: string, email: string, password: string, acceptTerms: boolean }) => {
            async function signUpRequest() {
                try {
                    const res = signUp(values.fullName, values.companyName, values.email, values.password, currency)
                    localStorage.setItem("token", (await res).data)
                    swal("you sign up seccessfully", "good", "success");
                    navigate("/landingPage")
                } catch (error) {
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
                <FormHelperText>Full Name</FormHelperText>
                <Text><TextField id="fullName" name="fullName" fullWidth margin='normal'
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                    helperText={formik.touched.fullName && formik.errors.fullName}
                /></Text>

                <Text>
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
                            <FormHelperText style={{ marginBottom: '15px' }}>Currency</FormHelperText>
                            <Autocomplete
                                id="currency"
                                className='currency'
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
                        </Grid>
                    </Grid>
                </Text>

                <FormHelperText>Password</FormHelperText>
                <Text><TextField id="password" name="password" fullWidth margin='normal' type={showPassword ? 'text' : 'password'} autoComplete="current-password"
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

                <FormHelperText>Email Address</FormHelperText>
                <Text><TextField id="email" name="email" fullWidth margin='normal'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                /></Text>

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
                        sx={{ backgroundColor: `${PALLETE.YELLOW} !important`, width: '10rem', marginTop: '1rem' }}
                        type="submit" variant="contained" >
                        Sign Up
                    </Button>
                </SignUpWrapper>
            </form >
        </div >
    );
};

export default SignUpForm;