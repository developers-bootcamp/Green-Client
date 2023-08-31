// import React, { useState } from "react"
// import { Button } from "@mui/material"
// import img from '../../../../images/giftsWithBalloon.png'
// import NewOrder from "./newOrderModel/NewOrder"
// import GlobalModal from "../../../../components/globalModal/GlobalModal"
// import OrderDetails from "./orderDetails/OrderDetails"

// interface prop {
//     name: string | undefined,
//     type: string | undefined
// }

// const PendingOrders: React.FC<prop> = ({ name, type }) => {
//     const [show, setShow] = useState(false);
//     const handleShow = () => setShow(true);
//     const handleCloseNewOrder = () => setShow(false);

//     const [showDetails, setShowDetails] = useState(false);
//     const handleShowDetails = () => setShowDetails(true);
//     const handleCloseOrderDetails = () => setShowDetails(false);

//     return (<>
//         {/* to add new order */}
//         {/* <div>
//             <Button variant="outlined" onClick={handleShow}>New Order</Button>
//             <div className="dialog">
//                 <GlobalModal header={"New Order"} isOpen={show} handleClose={handleCloseNewOrder} img={img} sideTxt={"We are almost done"}>
//                     <NewOrder />
//                 </GlobalModal>
//             </div>
//         </div > */}

//         {/* on click on an order will be open the order details window */}
//         <div>
//             <Button variant="outlined" onClick={handleShowDetails}>Order Details</Button>
//             <div className="dialog">
//                 <GlobalModal header={"Order's details"} isOpen={showDetails} handleClose={handleCloseOrderDetails} img={img} sideTxt={"We are almost done"}>
//                     <OrderDetails />
//                 </GlobalModal>
//             </div>
//         </div >
//     </>)
// }

 export default 1;