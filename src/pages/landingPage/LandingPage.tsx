import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import NewOrder from "../landingPage/tabComponnent/pendingOrders/newOrderModel/NewOrder"
import { Button, Dialog, DialogContent } from "@mui/material"

const LandingPage: React.FC = () => {

  const dispatch = useDispatch()
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const [close, setClose] = useState(false);

  const handleClose = () => setShow(false);
  useEffect(() => {
  }, [])

  return <>
 
  </>
}
export default LandingPage