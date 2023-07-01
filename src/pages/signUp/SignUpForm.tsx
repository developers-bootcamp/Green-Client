import React from "react";
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
import {useStyles} from "./SignUp.styles";
import { useNavigate } from "react-router-dom";

const SignUpForm: React.FC = () => {

    const classes = useStyles()

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
            companyName: '',
            termsAccepted: false,
        },
        validationSchema,
        onSubmit: (values) => {

            console.log(values);

            async function signUpRequest() {
                try {
                    const res = await axios.post(`http://localhost:3000/signIn`, values);
                    swal("you dont have a error", "good", "succes");
                    navigate("/LandingPage")
                    return (res.data);
                } catch (error) {
                    swal("you have a error", `${error}`, "error");
                    navigate("/LandingPage")
                }
            }

        }
    });

    const save = (e: any) => {
        e.preventDefault();
    }

    return <form onSubmit={save}>
        <label htmlFor="fullname">Full name</label><br />
        <TextField id="fullname" autoComplete='true' variant="outlined" onChange={(e) => { user.fullName = e.target.value }} /><br /><br />
        <label htmlFor="companyname">Company name</label><br />
        <TextField id="companyname" autoComplete='true' variant="outlined" onChange={(e) => { user.companyName = e.target.value }} /><br /><br />
        <TextField className={classes.text} id="password" name="password" label="Password" type={showPassword ? 'text' : 'password'} autoComplete="current-password"
            margin='normal'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}

            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }} />        <label htmlFor="email">Email address</label><br />
        <TextField id="email" autoComplete='true' variant="outlined" onChange={(e) => { user.email = e.target.value }} /><br /><br />
        <input type="checkbox" name="agree" id="agree" />
        <label htmlFor="agree"> I agree to the Terms of Service and Privacy Policy</label><br />
        <Button variant="contained" color="success">Sign Up</Button>
    </form>
}

export default SignUpForm