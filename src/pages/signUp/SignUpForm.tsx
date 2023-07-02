import React, { useState } from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box, Container, CssBaseline, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import swal from 'sweetalert';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Formik, FormikProps, Form, Field, ErrorMessage } from 'formik';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useStyles } from "./SignUp.styles";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
    fullName: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    companyName: yup.string().required('Name is required'),
    termsAccepted: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
});

const SignUpForm: React.FC = () => {

    const classes = useStyles()

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

            console.log(values);

            async function signUpRequest() {
                try {
                    const res = await axios.post(`http://localhost:8080/signUp`, values);
                    console.log(values);
                    swal("you dont have a error", "good", "success");
                    navigate("/LandingPage")
                    return (res.data);
                } catch (error) {
                    console.log(values);
                    swal("you have a error", `${error}`, "error");
                    navigate("/LandingPage")
                }
            }

        }
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const save = (e: any) => {
        e.preventDefault();
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="fullName">Full Name</label><br />
                <TextField className={classes.text} margin='normal' id="fullName" name="fullName"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                    helperText={formik.touched.fullName && formik.errors.fullName}
                />

                <br /><label htmlFor="companyName">Company Name</label><br />
                <TextField className={classes.text} margin='normal' id="companyName" name="companyName"
                    value={formik.values.companyName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                    helperText={formik.touched.companyName && formik.errors.companyName}
                />

                <br /><label htmlFor="email">Email Address</label><br />
                <TextField className={classes.text} margin='normal' id="email" name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />

                <br /><label htmlFor="password">Password</label><br />
                <TextField className={classes.text} id="password" name="password" margin='normal' type={showPassword ? 'text' : 'password'} autoComplete="current-password"
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
                < div className={classes.signUpWrapper}>
                    <Button type="submit" variant="contained" className={classes.signUpButton}>Sign Up</Button>
                </div>
            </form>

        </div >
    );
};

export default SignUpForm;