import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { fetchAllOrders } from '../../redux/actions/orderAction'
import NewOrder from "../NewOrderModel/NewOrder"
import { Button, Dialog, DialogContent } from "@mui/material"

const LandingPage: React.FC = () => {

    const dispatch = useDispatch()
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const [close, setClose] = useState(false);

    const handleClose = () => setShow(false);
    useEffect(() => {
        // dispatch(fetchAllOrders())
    }, [])


    return <>
      <div>
<Button variant="outlined" onClick={handleShow}>
  New Order
</Button>
<div className="dialog">
<Dialog
  open={show}
  onClose={handleClose}

  fullWidth
  maxWidth="lg"
  

 
>

  <DialogContent >
    <div  style={{ borderRadius: '50%' }}>
 <NewOrder  ></NewOrder></div>
  </DialogContent>
</Dialog></div>
</div>
    <p>landingPage component here</p>
    </>
}
export default LandingPage