import { TextField } from "@material-ui/core"
import img from './images/gifts.png'
import './signUp.css'
import { User } from "./interfaces/user"
const SignUp: React.FC = () => {

    const user: User = {
        fullName: "",
        companyName: "",
        password: "",
        email: ""
    };

    const save = (e: any) => {
        e.preventDefault()
        console.log(user);
    }

    return <div className="sign-up-wrapper">
        <div className="the-left" >
            <h1>Set up your account</h1>
            <form onSubmit={save}>
                <label htmlFor="fullname">Full name</label><br />
                <TextField id="fullname" variant="outlined" onChange={(e) => { user.fullName = e.target.value }} /><br /><br />
                <label htmlFor="companyname">Company name</label><br />
                <TextField id="companyname" variant="outlined" onChange={(e) => { user.companyName = e.target.value }} /><br /><br />
                <label htmlFor="password">Password</label><br />
                <TextField id="password" variant="outlined" onChange={(e) => { user.password = e.target.value }} /><br /><br />
                <label htmlFor="email">Email address</label><br />
                <TextField id="email" variant="outlined" onChange={(e) => { user.email = e.target.value }} /><br /><br />
                <input type="checkbox" name="agree" id="agree" />
                <label htmlFor="agree"> I agree to the Terms of Service and Privacy Policy</label><br />
                <input type="submit" value="Sign  Up" />
            </form>
        </div>
        <div className="the-right">
            <img src={img} alt="img" width="300px" height="350px"/>
            <p>Fill in your details so you can login later</p>
        </div>
    </div>
}

export default SignUp