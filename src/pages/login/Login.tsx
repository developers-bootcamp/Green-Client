import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, IconButton, InputAdornment, Paper, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { LOG_IN, PALLETE } from '../../config/config';
import { setError } from '../../redux/redux/errorSlice';
import store from '../../redux/redux/store';
import { ErrorModel } from '../../components/globalErrorModel/ErrorModel';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
    try {
      const res=await login();
      localStorage.setItem('token',res.data)
      navigate("/")
    } catch (err: any) {
      console.log("err",err);
      console.log("err.response?.status",err.response?.status);
      console.log("err.request",err.request);
      if (err.response?.status == 404) {
        console.log("in 404 if");
        store.dispatch(setError("signup"));
        navigate("/signup")
        //alert("sighnup")
      }
      else
     {
       const errorMessage = err?.response?.data?.message || 'An error occurred!';
       store.dispatch(setError(errorMessage));
     }

    }
  }

    const login = async () => {
      const res = await axios.get(`http://localhost:8080/user/${email}/${password}`);// {
      //   withCredentials: false,
      console.log(res);
      return res;
      //localStorage.setItem("token", res.data)
    }

    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '600px', height: '400px' }}>
          <p style={{ marginTop: '0px' }}>Log in to your account</p>
          <h4>Enter your email and password</h4>
          <div style={{ marginBottom: '10px' }}>
            <TextField id="email" label="Email address" variant="outlined" sx={{ marginBottom: '10px', width: '300px' }}
              onChange={(e) => { setEmail(e.target.value) }} />
          </div>
          <div>
            <FormControl sx={{ marginBottom: '10px', width: '300px' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => { setPassword(e.target.value) }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              <Button
                type='submit'
                variant="contained"
                sx={{
                  backgroundColor: PALLETE.YELLOW,
                  bottom: '-30px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '65%',
                  borderRadius: '15px'
                }}
                onClick={handleSubmit}>
                Sign Up
              </Button>
              {err && <p>{err}</p>}
            </FormControl>
          </div>

        </Paper>
      </Box>
    );
  };

export default Login;