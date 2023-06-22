import { Button } from "@material-ui/core"
import { useNavigate } from "react-router-dom"

const Login: React.FC = () => {
    const navigate = useNavigate()
    return <>
        <p>login component here</p>

        <Button variant="contained" color="primary" onClick={() => { navigate("/login") }} disableElevation>
            Login
        </Button>
        <Button variant="contained" color="primary" onClick={() => { navigate("/signUp") }} disableElevation>
            signUp
        </Button>
    </>
}

export default Login
