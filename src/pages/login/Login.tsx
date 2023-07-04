import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from 'axios';
import { string } from 'prop-types';
import { Interface } from "readline";

const Login:React.FC = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [err, setErr] = useState("");
   const navigate =useNavigate()

   const handleSubmit  = async () => {
    try {
      await login();
    }
    catch (err : any) {
      setErr(err.response.data?.message);
    }
  }

   const login=async()=>{
    const res =await axios.post("http://localhost:3600/api/auth/login", {email,password},{
      withCredentials:true,
    });
    localStorage.setItem("token",res.data.accesToken)
    navigate("/landingPage ") 
  }
  
  return (
    <div className="login-page" style={{ paddingTop: "50px" }}>
      <h1>Login</h1>
      <input onChange={(e) => { setEmail(e.target.value) }} type="text" placeholder="email" ></input>
      <input onChange={(e) => { setPassword(e.target.value) }} type="text" placeholder="password"></input>
      <button onClick={handleSubmit }>login</button> 
            {err && <p>{err}</p>}
    </div>
  );
}

export default Login;
