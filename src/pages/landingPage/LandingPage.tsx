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
  Open alert dialog
</Button>
<div className="dialog">
<Dialog
  open={show}
  onClose={handleClose}

  fullWidth
  maxWidth="lg"
  
  // aria-labelledby="alert-dialog-title"
  // aria-describedby="alert-dialog-description"
 
>

  <DialogContent >
    <div className="newOrder">
 <NewOrder ></NewOrder></div>
  </DialogContent>
</Dialog></div>
</div>
    <p>landingPage component here</p>
    </>
}
export default LandingPage