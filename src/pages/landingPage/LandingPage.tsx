import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import {useNavigate } from "react-router-dom";


const LandingPage: React.FC = () => {

  const dispatch = useDispatch()
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const [close, setClose] = useState(false);

  const handleClose = () => setShow(false);

  const navigate = useNavigate()
  useEffect(() => {
    if (sessionStorage.getItem("token") === null){
      navigate("/");
    }
  },[])

  return <>
 
  </>
}
export default LandingPage