
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
import { GridColDef, DataGrid, GridCellParams, GridActionsCellItem, GridRowId } from '@mui/x-data-grid';
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
import { store, RootState } from '../../../../redux/store';
import telephoneIcon from '../../../../images/telephone.png'
import emailIcon from '../../../../images/mail.png';
import TelephoneAndEmail from './TelephoneAndEmail';
import EditIcon from '@mui/icons-material/Edit';
import Mail from '@mui/icons-material/Email';
import Phone from '@mui/icons-material/Phone';


interface prop {
    name: string | undefined,
    type: string | undefined
}

const PendingOrders: React.FC<prop> = ({ name, type }) => {
    let count: number = 0
    const [show, setShow] = useState(false);
    const [sortPop, setSortPop] = React.useState<HTMLButtonElement | null>(null);
    const handleShow = () => setShow(true);
    const [data, setData] = useState([] as IOrder[])
    const [secondData, setSecondData] = useState([] as IOrder[])
    const [rows, setRows] = useState([] as { id: string, price: string, status: string, customer: string, products: string, createDate: string }[])
    const [secondRows, setSecondRows] = useState([] as { id: string, price: string, status: string, customer: string, products: string, createDate: string }[])
    const [firstSumOrders, setFirstSumOrders] = useState(0)
    const [socket, setSocket] = useState<any>();
    const [secondSumOrders, setSecondSumOrders] = useState(0)
    const [updateOrder, setUpdateOrder] = useState({ order: {}, show: false })
    const handleCloseNewOrder = () => setShow(false);
    const handleEditClick = (id: GridRowId) => () => {
        let allData = data.concat(secondData)
        allData.find((o: any) => {
            if (o.id == id) {
                setUpdateOrder({ order: o, show: true })
            }
        })
    }
    const handleCloseOrderDetails = () => setUpdateOrder({ order: {}, show: false });
    //pagination
    const [firstPaginationModel, setFirstPaginationModel] = React.useState({
        page: 0,
        pageSize: 1,
    });
    const [secondPaginationModel, setSecondPaginationModel] = React.useState({
        page: 0,
        pageSize: 1,
    });
    const filterTables = (filters: any) => {

    }
    const handlePhoneClick = (id: GridRowId) => () => {
        let allData = data.concat(secondData)
        let phone = ''

        allData.find((o: any) => {

            if (o.id == id) {

                phone = "mailto:" + o.customer.address.email
            }
        })
        window.location.href = `tel:${phone}`;
    };

const handleEmailClick = (id: GridRowId) => () => {
    let allData = data.concat(secondData)
    let mail = ''

    allData.find((o: any) => {

        if (o.id == id) {

            mail = "mailto:" + o.customer.address.email
        }
    })
    window.location.href = mail;
};
const companyId = useSelector((state: RootState) => state.companyIdReducer?.companyId || "");
const columns: GridColDef[] = [
    { field: 'customer', headerName: 'Customer', width: 150, cellClassName: 'regularCell' },
    {
        field: 'connection',
        type: 'actions',
        headerName: 'Connection',
        width: 100,
        headerClassName: 'super-app-theme--header',
        cellClassName: 'actions',
        getActions: ({ id }) => {
            return [
                <GridActionsCellItem
                    icon={<Mail />}
                    label="Mail"
                    className="textPrimary"
                    onClick={handleEmailClick(id)}
                    color="inherit"
                />,
                <GridActionsCellItem
                    icon={<Phone />}
                    label="phone"
                    className="textPrimary"
                    onClick={handlePhoneClick(id)}
                    color="inherit"
                />
            ];
        },
    },

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
    { field: 'createDate', headerName: 'Create Date', width: 280, cellClassName: 'regularCell' },
    {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        headerClassName: 'super-app-theme--header',
        cellClassName: 'actions',
        getActions: ({ id }) => {


            return [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    className="textPrimary"
                    onClick={handleEditClick(id)}
                    color="inherit"
                />
            ];
        },
    },
];


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
}
useEffect(() => {
    const newSocket = new Client();
    newSocket.configure({
        brokerURL: 'ws://localhost:8080/ws',
        onConnect: () => {
            newSocket.subscribe('/user/' + companyId + '/private', handleWebSocketMessage);
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
    let c = await getAllOrders(sortBy, statuses, firstPaginationModel.page, "1");
    setFirstSumOrders(await countOrders(statuses))

    setRows(c);
}
const secondTable = async (sortBy: string) => {
    let statuses = ['CREATED', 'APPROVED', 'PACKING']
    let c = await getAllOrders(sortBy, statuses, secondPaginationModel.page, "2");
    setSecondSumOrders(await countOrders(statuses))
    setSecondRows(c);
}
const getAllOrders = async (sortBy: string, orderStatus: string[], pageNo: number, num: string) => {
    const orders: IOrder[] = await getOrders(sortBy, pageNo, orderStatus);
    if (num == "1")
        setData(orders)
    if (num == "2")
        setSecondData(orders)
    let currentRows: { id: string, price: string, status: string, customer: string, products: string, createDate: string }[] = []
    orders.forEach(e => {
        if (e.customer == null)
            currentRows.push({ 'id': e.id, 'price': e.totalAmount + "$", 'status': e.orderStatus, 'customer': "null", 'products': "bla bla empty", 'createDate': new Date().toString() })
        else {
            let p = ""
            e.orderItemsList.forEach((prod: IOrderItem) => {
                if (prod.product != null)
                    p += `${prod.quantity} ${prod.product.name}, `
            })
            currentRows.push({ id: e.id, 'price': e.totalAmount + "$", 'status': e.orderStatus, 'customer': e.customer.fullName, 'products': p, 'createDate': e.auditData.createDate.toLocaleString() })
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

        <div>

            <div className="dialog">
                <GlobalModal header={"Order's details"} isOpen={updateOrder.show} handleClose={handleCloseOrderDetails} img={img} sideTxt={"We are almost done"}>
                    <OrderDetails order={updateOrder.order} />
                </GlobalModal>
            </div>
        </div >
        <div>
            <Button style={{
                "backgroundColor": PALLETE.ORANGE,
                "color": PALLETE.WHITE, "borderColor": PALLETE.WHITE
            }} variant="outlined" onClick={handleShow}>New Order</Button>
            <div className="dialog">
                <GlobalModal header={"New Order"} isOpen={show} handleClose={handleCloseNewOrder} img={img} sideTxt={"We are almost done"}>
                    <NewOrder setShow={handleCloseNewOrder} />
                </GlobalModal>
            </div>
        </div >
        <GlobalPopOver
            style={{ top: "0px!important", position: "absolute!important" }}
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
<a href="mailto:avigail4192@gmail.com">Example mailto link</a>


</>
)
}
export default PendingOrders;