import React, { useEffect, useState } from "react"
import { IOrder } from "../../../interfaces/IOrder"
import { IUser } from "../../../interfaces/IUser"
import { string } from "yup"
import NewOrder from "../../NewOrderModel/NewOrder"
import { Button, Dialog, DialogContent, MenuItem, Popover, Select, Table, Typography } from "@mui/material"
import { get } from "http"
import { getOrders } from "../../../apiCalls/orderCalls"
import { MyTypography } from "./PendingOrders.style"
import DataTable from "./try.pendingOrders"
import { GridColDef, DataGrid, GridCellParams } from '@mui/x-data-grid';
import './pendingOrders.css'
interface prop {
    name: string | undefined,
    type: string | undefined
}
const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'price', headerName: 'Price', width: 70 },
    {
        field: 'status', type: 'string', headerName: 'Status', width: 130,
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
    { field: 'customer', headerName: 'Customer', width: 130 },
    { field: 'products', headerName: 'Products', width: 300 },
];
const PendingOrders: React.FC<prop> = ({ name, type }) => {
    //=========================
    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 5,
    });

    const [rowCountState, setRowCountState] = React.useState(
        10
      );

    //=========================
    const [show, setShow] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const handleShow = () => setShow(true);
    const [close, setClose] = useState(false);
    const [data, setData] = useState([] as IOrder[])
    const [firstPageNo, setFirstPageNo] = useState(0)
    const [secondPageNo, setSecondPageNo] = useState(0)
    const [rows, setRows] = useState([] as { id: string, price: number, status: string, customer: string, products: string }[])

    const [secondRows, setSecondRows] = useState([] as { id: string, price: number, status: string, customer: string, products: string }[])
    const handleCloseNewOrder = () => setShow(false);
    const choose = (value: any) => {
        firstTable(value);
        secondTable(value);
    }
    useEffect(() => {
        firstTable('')
        secondTable('')
    }, [firstPageNo]);
    useEffect(() => {
        secondTable('')

    }, [secondPageNo])
    const firstTable = async (sortBy: string) => {
         let statuses=['PAYMENT_FAILED','PROSSES_FAILED']
        let c = await getAllOrders(sortBy, statuses, firstPageNo);
        setRows(await c);
    }
    const secondTable = async (sortBy: string) => {
       let statuses=['CREATED','APPROVED','PACKING']
        let c = await getAllOrders(sortBy, statuses, secondPageNo);
        setSecondRows(await c);
    }
    const getAllOrders = async (sortBy: string, orderStatus: string[], pageNo: number) => {
        const orders: IOrder[] = await getOrders(sortBy, pageNo, orderStatus);
        setData(orders)
        let currentRows: { id: string, price: number, status: string, customer: string, products: string }[] = []
        orders.forEach(e => {
            if (e.customer == null)
                currentRows.push({ id: e.cvc, 'price': e.totalAmount, 'status': e.orderStatus, 'customer': "null", 'products': "bla bla empty" })
            else {
                let p = ""
                debugger
                e.orderItemsList.forEach(prod => {
                    if (prod.product != null)
                        p += `${prod.quantity} ${prod.product.name}, `
                })
                currentRows.push({ id: e.cvc, 'price': e.totalAmount, 'status': e.orderStatus, 'customer': e.customer.fullName, 'products': p })
            }
        })
        return currentRows
    }



    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (<>
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
                        <div style={{ borderRadius: '50%' }}>
                            <NewOrder  ></NewOrder></div>
                    </DialogContent>
                </Dialog></div>
        </div>
        <Button variant="contained" onClick={handleClick}>
            Sort
        </Button>
        <Popover
            //id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <MyTypography >
                <h2>Sort by</h2>
                <Select onChange={(e) => { choose(e.target.value) }} >
                    <option value={""}></option>
                    <MenuItem value={"totalAmount"}>sum price</MenuItem>
                    <MenuItem value={"orderStatus"}>status</MenuItem>
                    <MenuItem value={"customer_id"}>customer</MenuItem>

                </Select>
            </MyTypography>
        </Popover>
        <div>{name}of {type}</div>


        <DataGrid
            columns={columns}
            // columns={columns} rows={rows}
            // {...data}
            // //rowCount={8}
            // //loading={isLoading}
            // pageSizeOptions={[5]}
            // paginationModel={paginationModel}
            // paginationMode="server"
            // onPaginationModelChange={setPaginationModel} 
            rows={rows}
            {...data}
            rowCount={rowCountState}
            //loading={isLoading}
           // pageSizeOptions={[5]}
            paginationModel={paginationModel}
            paginationMode="server"
            onPaginationModelChange={setPaginationModel}            />
        <button onClick={() => { setFirstPageNo(firstPageNo - 1) }}>prev</button>
        <button onClick={() => { setFirstPageNo(firstPageNo + 1) }}>more</button>
        <hr></hr>
        <DataGrid
            paginationMode="server"
            rows={secondRows}
            columns={columns}

        />
        <button onClick={() => { setSecondPageNo(secondPageNo - 1) }}>prev</button>
        <button onClick={() => { setSecondPageNo(secondPageNo + 1) }}>more</button>

    </>
    )
}
export default PendingOrders;


