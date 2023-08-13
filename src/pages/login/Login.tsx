import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import {
  EmailInput,
  LoginContainer,
  LoginForm,
  LoginSubtitle,
  LoginTitle,
  PasswordFormControl,
  StyledButton,
} from "./Login.styles";
import FormControl from '@mui/material/FormControl';

import { LOG_IN, PALLETE } from '../../config/config';


const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
    try {
      await login();
      navigate("/")
    } catch (err: any) {
      console.log(err);
      if (err.response?.status == 404) {
        navigate("/signup")
        alert("sighnup")
        //swal("please sign-Up before you login");
      }
      else
        alert("err")
      //swal("you have a error", `${err}`, "error");}
    }
  };

const login = async () => {
  const res = await axios.get(`${LOG_IN}/${email}/${password}`);// {
  //   withCredentials: false,
  console.log(res.data);

  // }
  localStorage.setItem("token", res.data)
  navigate("/")
}

  return (
    <LoginContainer>
      <LoginForm>
        <LoginTitle>Log in to your account</LoginTitle>
        <LoginSubtitle>Enter your email and password</LoginSubtitle>
        <div style={{ marginBottom: "10px" }}>
          <EmailInput
            id="email"
            label="Email address"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <PasswordFormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
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
            <StyledButton
              type="submit"
              variant="contained"
              onClick={handleSubmit}
            >
              Sign Up
            </StyledButton>
            {err && <p>{err}</p>}
          </PasswordFormControl>
        </div>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
