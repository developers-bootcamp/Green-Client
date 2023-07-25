import * as React from 'react';
import swal from 'sweetalert';
import { useState, useEffect } from 'react';
import { Button, DialogContent } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { MainDialog, AllData } from './PendingOrders.styles';

const PendingOrders: React.FC = () => {

    function createData(
        id: string,
        product: string,
        customer: string,
        status: string,
        priority: number,
        createDate: Date,
        price: string,
    ) {
        return { id, product, customer, status, priority, createDate, price };
    }

    const rows = [
        createData('1', 'Photo Albom 20 * 20', 'John Smith', 'new', 5, new Date(), '35.0'),
        createData('2', 'Photo Albom 20 * 20', 'Sarel Gol', 'new', 5, new Date(), '35.0'),
        createData('3', 'Photo Albom 20 * 20', 'Roy Keisar', 'new', 5, new Date(), '35.0'),
        createData('4', 'Photo Albom 20 * 20', 'Admonend Deivid', 'new', 5, new Date(), '35.0'),
        createData('5', 'Photo Albom 20 * 20', 'Ron Tova', 'new', 5, new Date(), '35.0'),
        createData('6', 'Photo Albom 20 * 20', 'Shai Chovev', 'new', 5, new Date(), '35.0')
    ];

    const [open, setOpen] = useState(true);

    const handleOpenDialog = () => {
        setOpen(true)
    }

    const handleCloseDialog = () => {
        setOpen(false)
    }

    const [orders, setOrders] = useState([])

    async function ordersRequest() {
        try {
            debugger
            const config = { headers: { 'Authorization': localStorage.getItem("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb21wYW55SWQiOiI2NGJkMWI2MzlmMzE2YTE0NGZkZTEzZWMiLCJyb2xlSWQiOiIxIiwiaWQiOiI2NGJkMWI2NTlmMzE2YTE0NGZkZTEzZWQiLCJleHAiOjE2OTA3MTk3MTh9.Ilk0q4fuDOlqQD__CEJJl1wlGV_w51i1CHmJsLnHxdE") } };
            const res = await axios.get(`http://localhost:8080/order`, config)
            debugger
            // .then((res) => { setOrders(res.data); console.log(orders) })
            console.log(res.data);
            // swal("you don't have a error", 'good', "sucssess")

        } catch (error) {
            swal("you have a error", `${error}`, "error");
        }
    }

    useEffect(() => { ordersRequest() }, [])

    return <>
        {/* <MainDialog> */}
            <dialog onClose={handleCloseDialog} open={open} >
                <DialogContent>
                    <Button value="new order"></Button><br />
                    <label>top priority</label>
                    <AllData>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>product</TableCell>
                                        <TableCell >customer</TableCell>
                                        <TableCell >status</TableCell>
                                        <TableCell >priority</TableCell>
                                        <TableCell >createDate</TableCell>
                                        <TableCell >price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.product}
                                            </TableCell>
                                            <TableCell >{row.customer}</TableCell>
                                            <TableCell >{row.status}</TableCell>
                                            <TableCell >{row.priority}</TableCell>
                                            <TableCell >{row.createDate.getDate().toString()}</TableCell>
                                            <TableCell >{row.price}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AllData>
                    <br />
                    <AllData>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>product</TableCell>
                                        <TableCell >customer</TableCell>
                                        <TableCell >status</TableCell>
                                        <TableCell >priority</TableCell>
                                        <TableCell >createDate</TableCell>
                                        <TableCell >price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.product}
                                            </TableCell>
                                            <TableCell >{row.customer}</TableCell>
                                            <TableCell >{row.status}</TableCell>
                                            <TableCell >{row.priority}</TableCell>
                                            <TableCell >{row.createDate.getDate().toString()}</TableCell>
                                            <TableCell >{row.price}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AllData>
                </DialogContent >
            </dialog>
        {/* </MainDialog> */}
    </>
}

export default PendingOrders