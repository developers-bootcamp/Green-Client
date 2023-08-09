// import { Button, Dialog, DialogContent } from "@mui/material";
import React, { useState } from "react"
import { Button, Dialog, DialogContent } from "@mui/material"
import IOrder from "../../../interfaces/model/IOrder"
import IUser from "../../../interfaces/model/IUser"

import { string } from "yup"
import NewOrder from "../../NewOrderModel/NewOrder"

interface prop {
    name: string | undefined,
    type: string | undefined
}
const PendingOrders: React.FC<prop> = ({ name, type }) => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const [close, setClose] = useState(false);

    const handleCloseNewOrder = () => setShow(false);
    return (<>
        <div>{name}of {type}</div>
        <div style={{ fontSize: "200%", color: "black" }}>This is PendingOrders component</div>

        <div>
            <Button variant="outlined" onClick={handleShow}>
                New Order
            </Button>
            <div className="dialog">
                <Dialog
                    open={show}
                    onClose={handleCloseNewOrder}

                    fullWidth
                    maxWidth="lg"



                >

                    <DialogContent >
                    
                            <NewOrder  ></NewOrder>
                    </DialogContent>
                </Dialog></div>
        </div>
    </>)
}
export default PendingOrders;
