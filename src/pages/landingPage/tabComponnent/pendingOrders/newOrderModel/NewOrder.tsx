import { useFormik } from "formik";
import { useState } from "react";
import * as yup from 'yup';
import MyAutocomplete from "../../../../../components/MyAutocomplete";
import IUser from '../../../../../interfaces/model/IUser';
import IOrder from '../../../../../interfaces/model/IOrder';
import { addNewOrder, calculateOrder } from '../../../../../apiCalls/orderCalls';
import IOrderItem from '../../../../../interfaces/model/IOrderItem';
import { Button, FormHelperText, Grid, MenuItem, Select, TextField } from '@mui/material';
import { getProductsAutocomplete } from '../../../../../apiCalls/productCalls';
import { getCustomersAutocomplete } from '../../../../../apiCalls/userCalls';
import { ButtonWrapper } from './NewOrder.style';
import ICurrencyState from '../../../../../interfaces/ICurrencyState';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import { IProduct } from '../../../../../interfaces/model/IProduct';
import { PALLETE } from '../../../../../config/config';
import { randomId } from '@mui/x-data-grid-generator';

const validationSchema = yup.object({
    ccn: yup.string().required('Credit card number is required').min(16, "credit card number is too short").max(16, "credit card number is too long").matches(/^\d+$/, 'The field should have digits only'),
    cvv: yup.string().min(3, "cvv must have 3 digits").max(3, "cvv must have 3 digits").required("cvv is required").matches(/^\d+$/, 'The field should have digits only'),
    ed: yup.date().required("expire date is required")

});
interface NewOrderProps {
    setShow: () => void
}
function NewOrder(props: NewOrderProps) {
    const [orderItems, setOrderItems] = useState([] as IOrderItem[])
    const [sumPrice, setSumPrice] = useState(0);
    const [calculatedOrder, setCalculatedOrder] = useState({} as { [key: string]: any })
    const listOfCurrencies: string[] = useSelector<RootState, ICurrencyState>(state => state.currencyReducer).currencies;

    const theOrder: IOrder = {
        id:randomId(),
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
            theOrder.expiryOn = formik.values.ed
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
            s += `${e.quantity} ${e.product.name} price: ${Object.keys(calculatedOrder[e.product.id])[0]} discount: ${calculatedOrder[e.product.id][Object.keys(calculatedOrder[e.product.id])[0]]}`
        e.product.discountType === "FIXED_AMOUNT" ? s += " " + formik.values.currency + " " : s += "% "
        return s;
    }
    const add = async () => {

        const tmp = orderItems.find(e => e.product.id === formik.values.product.id)
        if (tmp != null) {
            if (window.confirm("you already ordered this product\n would you like to order more?")) {
                orderItems.forEach(e => {
                    if (e.product.id === formik.values.product.id)
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
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center" alignItems="center">

                    <Grid container xs={12}>

                        <Grid item xs={6}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center" alignItems="center">

                                <Grid item xs={12}>
                                    <FormHelperText>customer</FormHelperText>
                                    <MyAutocomplete getFunction={getCustomersAutocomplete}
                                        setItem={(chosen: IUser) => { formik.values.customer = chosen }} displayField={1}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormHelperText>product</FormHelperText>
                                    <MyAutocomplete getFunction={getProductsAutocomplete}
                                        setItem={(chosen: IProduct) => { formik.values.product = chosen }} displayField={1} />
                                </Grid>

                                <Grid item xs={6}>
                                    <FormHelperText>quantity</FormHelperText>
                                    <TextField type="number"
                                        onChange={(e: { target: { value: string; }; }) => formik.values.quantity = parseInt(e.target.value)}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                                        helperText={formik.touched.quantity && formik.errors.quantity}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <FormHelperText>currency</FormHelperText>
                                    <Select fullWidth //value={formik.values.currency}
                                        onChange={(e: { target: { value: string; }; }) => {
                                            formik.values.currency = typeof e.target.value === 'string' ? e.target.value : ""
                                            e.target.value = formik.values.currency
                                        }}>
                                        {listOfCurrencies.map((currency) => <MenuItem value={currency}>{currency}</MenuItem>)}
                                    </Select>
                                </Grid>

                                <Grid item xs={12} mb={2} mt={1}>
                                    <Button sx={{ backgroundColor: `${PALLETE.BLUE} !important`, width: '100%', display: 'block' }}
                                        variant="contained"
                                        onClick={() => { add() }}>
                                        add
                                    </Button>
                                </Grid>

                            </Grid>
                        </Grid>

                        <Grid item xs={6} pl={2}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }} justifyContent="center" alignItems="center">

                                <Grid item xs={12} sx={{ textAlign: 'end' }}>
                                    <h3>{`price: ${sumPrice}`}</h3>
                                </Grid>

                                <Grid item xs={12} sx={{ textAlign: 'start' }}>
                                    <h4>products list:</h4>
                                    <ul>
                                        {orderItems.map((product, index) => <li>{itemToString(product, index)}<button onClick={() => deleteItem(index)}>x</button></li>)}
                                    </ul>
                                </Grid>

                            </Grid>
                        </Grid>

                    </Grid>

                    <Grid container xs={12} sx={{ borderTop: '1px solid' }}>

                        <Grid item xs={8}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center" alignItems="center">

                                <Grid item xs={12}>
                                    <FormHelperText>credit card number</FormHelperText>
                                    <TextField id="ccn" name="ccn" fullWidth margin='normal'
                                        value={formik.values.ccn}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.ccn && Boolean(formik.errors.ccn)}
                                        helperText={formik.touched.ccn && formik.errors.ccn}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <FormHelperText>Expires on</FormHelperText>
                                    <TextField id='ed' name='ed' fullWidth margin='normal'
                                        type="date"
                                        value={formik.values.ed}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.ed && Boolean(formik.errors.ed)}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <FormHelperText>cvv</FormHelperText>
                                    <TextField id="cvv" name="cvv" fullWidth margin='normal'
                                        value={formik.values.cvv}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.cvv && Boolean(formik.errors.cvv)}
                                        helperText={formik.touched.cvv && formik.errors.cvv}
                                    />
                                </Grid>

                            </Grid>
                        </Grid>

                        <Grid item xs={4}>
                            <ButtonWrapper>
                                <Button sx={{ backgroundColor: `${PALLETE.YELLOW} !important`, width: '10rem', marginTop: '12rem' }}
                                    type="submit" variant="contained" >
                                    buy now
                                </Button>
                            </ButtonWrapper>
                        </Grid>

                    </Grid>

                </Grid>
            </form>
        </div >

    </>)
}

export default NewOrder