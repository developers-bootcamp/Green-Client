import { useEffect } from "react"
import TabsComponent from "./TabsComponent"
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {

  let navigate = useNavigate()
  let token: any = null;

  useEffect(() => {
    token = sessionStorage.getItem('token')
    if (token === null) {
      token = sessionStorage.getItem('token')
      console.log(token);
      navigate('/')
    } else {
      navigate('/landingPage')
    }
  }, [])

  const checkToken = () => { return sessionStorage.getItem('token') }

  return <>
    {checkToken() && <TabsComponent />}
  </>

}
export default LandingPage