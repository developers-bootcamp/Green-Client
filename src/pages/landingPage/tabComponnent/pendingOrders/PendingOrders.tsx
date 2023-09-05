

import React, { useEffect, useState } from "react"
import IOrder from '../../../../interfaces/model/IOrder'
import IUser from "../../../../interfaces/model/IUser"
import { string } from "yup"
import Box from '@mui/material/Box';
import { Button, Dialog, DialogContent, MenuItem, Popover, Select, Table, Typography } from "@mui/material"
import { get } from "http"
import { countOrders, getOrders } from "../../../../apiCalls/orderCalls"
import { MyTypography, NewOrderButton, SortButton } from "./PendingOrders.style"
//import DataTable from "../try.pendingOrders"
import { GridColDef, DataGrid, GridCellParams } from '@mui/x-data-grid';
import './pendingOrders.css'
import IOrderItem from "../../../../interfaces/model/IOrderItem"
import SortIcon from '@mui/icons-material/Sort';
import NewOrder from "../pendingOrders/newOrderModel/NewOrder"
import GlobalModal from "../../../../components/globalModal/GlobalModal"
import img from '../../../../images/giftsWithBalloon.png'
import OrderDetails from "../pendingOrders/orderDetails/OrderDetails"
import GlobalPopOver from "../../../../components/GlobalPopOver"
import AllFilter from "../pendingOrders/filter/AllFilter"
import filterImg from "../../../../images/filter.png"
import { PALLETE } from "../../../../config/config";
import { Client, Message } from '@stomp/stompjs';
import { useSelector } from 'react-redux';
import  {store, RootState } from '../../../../redux/store';
interface prop {
    name: string | undefined,
    type: string | undefined
}
const columns: GridColDef[] = [
    { field: 'customer', headerName: 'Customer', width: 150, cellClassName: 'regularCell' },

    {
        field: 'status', type: 'string', headerName: 'Status', width: 200,
        
        cellClassName: (params: GridCellParams<any, string>) => {
            if (params.value == null) {
                return '';
            }
            if (params.value == 'CREATED')
                return 'green';
            if (params.value == 'APPROVED')
                return 'blue'
            if (params.value == 'PACKING')
                return 'yellow'
            if (params.value == 'PAYMENT_FAILED')
                return 'red'
            if (params.value == 'PROSSES_FAILED')
                return 'orang'

            return ''
        },

    },

    { field: 'products', headerName: 'Products', width: 400, cellClassName: 'regularCell' },
    { field: 'price', headerName: 'Price', width: 100, cellClassName: 'regularCell' },
    { field: 'createDate', headerName: 'Create Date', width: 300, cellClassName: 'regularCell' },
];
const PendingOrders: React.FC<prop> = ({ name, type }) => {
    let count: number = 0
    const [show, setShow] = useState(false);
    const [sortPop, setSortPop] = React.useState<HTMLButtonElement | null>(null);
    const handleShow = () => setShow(true);
    const [data, setData] = useState([] as IOrder[])
    const [rows, setRows] = useState([] as { id: string, price: string, status: string, customer: string, products: string, createDate: string }[])
    const [secondRows, setSecondRows] = useState([] as { id: string, price: string, status: string, customer: string, products: string, createDate: string }[])
    const [firstSumOrders, setFirstSumOrders] = useState(0)
    const[socket,setSocket]=useState<any>();

    const [showDetails, setShowDetails] = useState(false);
    const [secondSumOrders, setSecondSumOrders] = useState(0)
    const handleCloseNewOrder = () => setShow(false);
    //order details
    const handleShowDetails = () => setShowDetails(true);
    const handleCloseOrderDetails = () => setShowDetails(false);
    //pagination
    const [firstPaginationModel, setFirstPaginationModel] = React.useState({
        page: 0,
        pageSize: 1,
    });
    const [secondPaginationModel, setSecondPaginationModel] = React.useState({
        page: 0,
        pageSize: 1,
    });
    const filterTables=(filters:any)=>{
    
    }
    const companyId = useSelector((state: RootState) => state.companyIdReducer?.companyId || "");

    console.log(companyId,"ggfsdsdsdda");

    //end pagination
    //שליפות
    useEffect(() => {
        firstTable('')


    }, [firstPaginationModel, show]);
    useEffect(() => {
        secondTable('')

    }, [secondPaginationModel, show])

    const handleWebSocketMessage = (message: Message) => {
        const order: IOrder = JSON.parse(message.body);
        firstTable('')
        secondTable('')

        console.log(order);
        console.log(order,"order");
    }
    useEffect(() => {
        const newSocket = new Client();
        newSocket.configure({
            brokerURL: 'ws://localhost:8080/ws',
            onConnect: () => {
                newSocket.subscribe('/user/'+companyId+'/private', handleWebSocketMessage);
            }
        });
        newSocket.activate();
        setSocket(newSocket);
        return () => {
            newSocket.deactivate();
        };
    }, [])
    const firstTable = async (sortBy: string) => {
        let statuses = ['PAYMENT_FAILED', 'PROSSES_FAILED']
        let c = await getAllOrders(sortBy, statuses, firstPaginationModel.page);
        setFirstSumOrders(await countOrders(statuses))
        setRows(await c);
    }
    const secondTable = async (sortBy: string) => {
        let statuses = ['CREATED', 'APPROVED', 'PACKING']
        let c = await getAllOrders(sortBy, statuses, secondPaginationModel.page);
        setSecondSumOrders(await countOrders(statuses))

        setSecondRows(await c);
    }
    const getAllOrders = async (sortBy: string, orderStatus: string[], pageNo: number) => {
        const orders: IOrder[] = await getOrders(sortBy, pageNo, orderStatus);
        setData(orders)
        let currentRows: { id: string, price: string, status: string, customer: string, products: string, createDate: string }[] = []
        orders.forEach(e => {
            if (e.customer == null)
                currentRows.push({ 'id': (count++).toString(), 'price': e.totalAmount + "$", 'status': e.orderStatus, 'customer': "null", 'products': "bla bla empty", 'createDate': new Date().toString() })
            else {
                let p = ""
                e.orderItemsList.forEach((prod: IOrderItem) => {
                    if (prod.product != null)
                        p += `${prod.quantity} ${prod.product.name}, `
                })
                currentRows.push({ id: (count++).toString(), 'price': e.totalAmount + "$", 'status': e.orderStatus, 'customer': e.customer.fullName, 'products': p, 'createDate': e.auditData.createDate.toLocaleString() })
            }
        })
        return currentRows
    }


    // end שליפות
    //sort
    const choose = (value: any) => {
        firstTable(value);
        secondTable(value);
    }
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setSortPop(event.currentTarget);
    };

    const handleClose = () => {
        setSortPop(null);
    };
    const open = Boolean(sortPop);

    //end sort
    return (<>
        <div>
            {/* <NewOrderButton variant="outlined" onClick={handleShow}>
                New Order
            </NewOrderButton>
            <div className="dialog">
                <Dialog
                    open={show}
                    onClose={handleCloseNewOrder}
                    fullWidth
                    maxWidth="lg"
                >
                    <DialogContent >
                        <div style={{ borderRadius: '50%' }}>
                            <NewOrder setShow={handleCloseNewOrder} ></NewOrder></div>
                    </DialogContent>
                </Dialog></div> */}
            {/* on click on an order will be open the order details window */}
            <div>
                <Button style={{ "backgroundColor":PALLETE.ORANGE,
    "color":PALLETE.WHITE,"borderColor":PALLETE.WHITE}}variant="outlined" onClick={handleShowDetails}>Order Details</Button>
                <div className="dialog">
                    <GlobalModal header={"Order's details"} isOpen={showDetails} handleClose={handleCloseOrderDetails} img={img} sideTxt={"We are almost done"}>
                        <OrderDetails />
                    </GlobalModal>
                </div>
            </div >
            <div>
                <Button style={{ "backgroundColor":PALLETE.ORANGE,
    "color":PALLETE.WHITE,"borderColor":PALLETE.WHITE}} variant="outlined" onClick={handleShow}>New Order</Button>
                <div className="dialog">
                    <GlobalModal header={"New Order"} isOpen={show} handleClose={handleCloseNewOrder} img={img} sideTxt={"We are almost done"}>
                        <NewOrder setShow={handleCloseNewOrder} />
                    </GlobalModal>
                </div>
            </div >
          <GlobalPopOver
          style={{top:"0px!important",position:"absolute!important"}}
            name={"filter"}
            Pop={AllFilter}
            image={filterImg}
            filterTables={filterTables}
          ></GlobalPopOver>
        </div>
        <SortButton variant="contained" onClick={handleClick}>
            Sort <SortIcon />
        </SortButton>
        <Popover

            open={open}
            anchorEl={sortPop}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <MyTypography >
                <h2>Sort by <SortIcon /></h2>
                <Select onChange={(e) => { choose(e.target.value) }} >
                    <option value={""}></option>
                    <MenuItem value={"totalAmount"}>sum price</MenuItem>
                    <MenuItem value={"orderStatus"}>status</MenuItem>
                    <MenuItem value={"customer_id"}>customer</MenuItem>

                </Select>
            </MyTypography>
        </Popover>
        <DataGrid
            columns={columns} rows={rows}
            rowCount={firstSumOrders}
            paginationModel={firstPaginationModel}
            paginationMode="server"
            onPaginationModelChange={setFirstPaginationModel}

        />


        <br></br>
           
                    
                    <DataGrid
                        columns={columns} rows={secondRows}
                        rowCount={secondSumOrders}
                        paginationModel={secondPaginationModel}
                        paginationMode="server"
                        onPaginationModelChange={setSecondPaginationModel}

                    />
 


    </>
    )
}
export default PendingOrders;