//import { Button, createStyles, FormControl, Grid, Input, MenuItem, Select, styled, TextField, ThemeProvider } from "@material-ui/core";
import Autocomplete from '@mui/material/Autocomplete';
import { ErrorMessage, Formik, useFormik, yupToFormErrors } from "formik";

import { FormikHelpers } from "formik/dist/types";
import { useEffect, useState } from "react";
import * as yup from 'yup';
import axios from "axios";
import { log } from "console";

import MyAutocomplete from "../../../../../components/MyAutocomplete";
import { ExecException } from "child_process";
import IUser from '../../../../../interfaces/model/IUser';
import IOrder from '../../../../../interfaces/model/IOrder';
import { addNewOrder, calculateOrder } from '../../../../../apiCalls/orderCalls';
import IOrderItem from '../../../../../interfaces/model/IOrderItem';
import { Grid, TextField } from '@mui/material';
import { getProductsAutocomplete } from '../../../../../apiCalls/productCalls';
import { getCustomersAutocomplete } from '../../../../../apiCalls/userCalls';
import { AddButton, BaloonImg, MyButton } from './NewOrder.style';
import ICurrencyState from '../../../../../interfaces/ICurrencyState';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import { IProduct } from '../../../../../interfaces/model/IProduct';


const validationSchema = yup.object({
    ccn: yup.string().required('Credit card number is required').min(16, "credit card number is too short").max(16, "credit card number is too long").matches(/^\d+$/, 'The field should have digits only'),
    cvv: yup.string().min(3, "cvv must have 3 digits").max(3, "cvv must have 3 digits").required("cvv is required").matches(/^\d+$/, 'The field should have digits only'),
    ed: yup.date().required("expire date is required")

});
interface NewOrderProps{
    setShow:() =>void
}
function NewOrder (props:NewOrderProps)  {
    const [orderItems, setOrderItems] = useState([] as IOrderItem[])
    const [sumPrice, setSumPrice] = useState(0);
    const [calculatedOrder, setCalculatedOrder] = useState({} as { [key: string]: any })
    const listOfCurrencies: string[] = useSelector<RootState, ICurrencyState>(state => state.currencyReducer).currencies;


    const saveCreditCardDetails = (ccn: string, cvv: string, ed: Date) => {

    }

    const theOrder: IOrder = {
        employee: null,
        customer: {} as IUser,
        totalAmount: sumPrice,
        orderItemsList: [],
        orderStatus: "",
        company: null,
        creditCardNumber: "",
        expiryOn: new Date(),
        cvc: "",
        notificationFlag: true,
        currency: "",
        auditData: {
            createDate: new Date(),
            updateDate: new Date()
        }
    }
    const calc = async () => {
        try {

            theOrder.orderStatus = "CREATED"
            const a = await calculateOrder(theOrder);
            setCalculatedOrder(a);
            if (a["-1"] as { [key: number]: number }) {
                let sum = await Object.keys(a["-1"])[0];
                await setSumPrice(parseInt(sum));
            }
        }
        catch (e) {
            throw new Error("something went wrong...")
        }

    }

    const formik = useFormik({
        initialValues: {
            customer: {} as IUser,
            product: {} as IProduct,
            ccn: '',
            ed: new Date(),
            cvv: '',
            quantity: 1,
            currency: ""
        },
        validationSchema,
        onSubmit: async () => {
            theOrder.customer = formik.values.customer
            theOrder.creditCardNumber = formik.values.ccn
            theOrder.orderStatus = "CREATED"
            theOrder.cvc = formik.values.cvv
            theOrder.orderItemsList = orderItems
            addNewOrder(theOrder);
            props.setShow()
        }
    });
    const itemToString = (e: IOrderItem, i: number): string => {

        let s = "";
        if (e.product.id in calculatedOrder)
            s += e.quantity + " " + e.product.name + "price: " + Object.keys(calculatedOrder[e.product.id])[0]//JSON.stringify(calculatedOrder[e.productId.id][])

                + "  discount: " + calculatedOrder[e.product.id][Object.keys(calculatedOrder[e.product.id])[0]]//+ JSON.stringify(calculatedOrder[e.productId.id]);
        e.product.discountType == "FIXED_AMOUNT" ? s += " " + formik.values.currency + " " : s += "% "
        return s;
    }
    const add = async () => {

        const tmp = orderItems.find(e => e.product.id == formik.values.product.id)
        if (tmp != null) {
            if (window.confirm("you already ordered this product\n would ypu like to order more?")) {
                orderItems.forEach(e => {
                    if (e.product.id == formik.values.product.id)
                        e.quantity += formik.values.quantity
                })
                theOrder.orderItemsList = orderItems
                await calc()
            }
        }
        else {
            const prod: IOrderItem = {

                product: formik.values.product,
                amount: formik.values.product.price,
                quantity: formik.values.quantity
            }
            theOrder.orderItemsList = [...orderItems, prod]
            theOrder.customer = formik.values.customer
            theOrder.creditCardNumber = ""
            theOrder.orderStatus = "CREATED"
            theOrder.cvc = ""
            theOrder.currency = formik.values.currency
            let g = [...orderItems, prod]
            setOrderItems(g)
            await calc();
        }
    }
    const deleteItem = async (i: number) => {

        let tmp: IOrderItem[] = [] as IOrderItem[];
        orderItems.forEach((e, index) => {
            if (index !== i)
                tmp.push(e);

        })
        setOrderItems(tmp)
        theOrder.orderItemsList = tmp
        await calc()
    }
    return (<>
        <div className="form">
            <Grid container spacing={2}>
                <Grid item xs={8} container>
                    <Grid item xs={6}> <h3>New Order </h3> </Grid> <Grid item xs={6}><h3>Price {sumPrice}</h3></Grid>
                    <Grid container>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid item xs={7}>
                                <div className="chooseProduct">
                                    <div className="customer">
                                        <label htmlFor="customer" style={{ display: "block" }}>
                                            Customer
                                        </label>

                                        <MyAutocomplete setItem={(chosen: IUser) => { formik.values.customer = chosen }}
                                            getFunction={getCustomersAutocomplete} displayField={1}></MyAutocomplete>
                                    </div>
                                    <label htmlFor="product" className="productLbl">Product</label>
                                    {/* <label htmlFor="discount" className="discountLbl" > Discount</label> */}
                                    <Grid className="product" container><Grid item xs={12} >
                                        <div >
                                            <Grid item xs={6}>
                                                <MyAutocomplete getFunction={getProductsAutocomplete}
                                                    setItem={(chosen: IProduct) => { formik.values.product = chosen }} displayField={1}></MyAutocomplete></Grid>
                                            <Grid item xs={2}>  <TextField variant="outlined" onChange={(e: { target: { value: string; }; }) => formik.values.quantity = parseInt(e.target.value)} type="number" /> </Grid>
                                            <Grid item xs={2}>   <select
                                                onChange={(e: { target: { value: string; }; }) => { formik.values.currency = typeof e.target.value === 'string' ? e.target.value : "" }}
                                            >
                                                {listOfCurrencies.map(e => { return <option>{e}</option> })}
                                            </select>
                                            </Grid>
                                        </div>
                                    </Grid>

                                    </Grid>
                                    <Grid item xs={12}>
                                        <AddButton onClick={() => add()}
                                            variant="contained">Add</AddButton></Grid>
                                </div>
                            </Grid>
                            <Grid item xs={5}>
                                <div className="orderedProducts">
                                    products you orderd:
                                    <ul>
                                        {orderItems.map((e, i) => <li>{itemToString(e, i)}<button onClick={() => deleteItem(i)}>x</button></li>)}
                                    </ul>
                                </div>
                            </Grid>
                            <hr />
                            <Grid container spacing={2}>
                                <Grid item xs={12}><label htmlFor="ccn">Credit Card Number</label></Grid>

                                <Grid item xs={12}>  <TextField
                                    error={formik.touched.ccn && Boolean(formik.errors.ccn)}
                                    helperText={formik.touched.ccn && formik.errors.ccn}
                                    variant="outlined"
                                    id="ccn"

                                    value={formik.values.ccn}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                /></Grid>
                                <Grid item xs={6}><label htmlFor="ed">Expier Date</label></Grid>
                                <Grid item xs={6}><label htmlFor="cvv">cvv</label></Grid>
                                <Grid item xs={5}>   <TextField

                                    variant="outlined"
                                    type="date"
                                    id="ed"
                                    value={formik.values.ed}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        error={formik.touched.cvv && Boolean(formik.errors.cvv)}
                                        helperText={formik.touched.cvv && formik.errors.cvv}
                                        label="cvv"
                                        variant="outlined"
                                        id="cvv"
                                        value={formik.values.cvv}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    /></Grid>
                                <Grid item xs={2}>
                                    <MyButton type="submit">buy now</MyButton></Grid></Grid>
                        </form>

                    </Grid>

                </Grid >
                {/* <Grid item xs={4}>
                    <BaloonImg >
                        <img  alt="baloon" />
                    </BaloonImg>

                </Grid> */}
            </Grid >
        </div >

    </>)
}

export default NewOrder