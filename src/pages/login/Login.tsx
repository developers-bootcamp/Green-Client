import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, IconButton, InputAdornment, Paper, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { LOG_IN, PALLETE } from '../../config/config';
import errorSlice, { setError } from '../../redux/slices/errorSlice';
import {RootState, store} from '../../redux/store';
import { ErrorModel } from '../../components/globalErrorModel/ErrorModel';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';
import { setRole } from '../../redux/slices/roleSlice';
import {login} from '../../apiCalls/userCalls'

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate()
  const errorIsOpen = useSelector((state: RootState) => state.errorReducer.isOpen);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
    try {
      const res = await login(email,password);
      localStorage.setItem('token',res.data.split(":")[0]);
      store.dispatch(setRole(res.data.split(":")[1]));
      navigate("/");
    } catch (err: any) {
      if (err.response?.status == 404) {
        swal("please signup before you login", "", "error");
        navigate("/signup");
      }
      else{
        if(err.response?.status == 401){
          swal("the password is uncurrect","",  "error");
        }
      else
     {
       const errorMessage = err?.response?.data?.message || 'An error occurred!';
       swal("you have a error", `${err}`, "error");
     }}

    }
  }

   

    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '600px', height: '400px' }}>
          <div>
            <p style={{ marginBottom: '5px' }}>Log in to your account</p>
            <h4 style={{ marginTop: '0px' }}>Enter your email and password</h4>
          </div>
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
                LOGIN
              </Button>
              <br></br><br></br>
             <p>don't have an account yet? <Link to="/signup">signUp</Link></p>
              {err && <p>{err}</p>}
            </FormControl>
          </div>

        </Paper>
      </Box>
    );
  };

export default Login;