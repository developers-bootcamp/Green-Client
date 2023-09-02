import CreditCard from '../CreditCard';
import IOrder from '../../../../../interfaces/model/IOrder';
import IUser from '../../../../../interfaces/model/IUser';
import { Button, FormHelperText, Grid, MenuItem, Select } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import MyAutocomplete from '../../../../../components/MyAutocomplete';
import { getCustomersAutocomplete } from '../../../../../apiCalls/userCalls';
import { getProductsAutocomplete } from '../../../../../apiCalls/productCalls';
import { IProduct } from '../../../../../interfaces/model/IProduct';
import { BASE_URL, PALLETE } from '../../../../../config/config';
import { Autocomplete } from "@mui/material";
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import ICurrencyState from '../../../../../interfaces/ICurrencyState';
import TextField from '@mui/material/TextField';
import React, { useEffect } from 'react';
import axios from 'axios';
import img from '../../../../../images/arrowIcon.png';
import { Img, Text } from './OrderDetails.styles';
import IOrderItem from '../../../../../interfaces/model/IOrderItem';

const OrderDetails = (props: any) => {

    const listOfCurrencies: string[] = useSelector<RootState, ICurrencyState>(state => state.currencyReducer).currencies;

    const validationSchema = yup.object({
        customer: yup.object().required('customer is required'),
        product: yup.object().required('product is required'),
        quantity: yup.number().required('quantity is required').min(1),
        currency: yup.string().required('currency is required')
    });

    const formik = useFormik({
        initialValues: {
            customer: {} as IUser,
            product: {} as IProduct,
            quantity: 1,
            currency: ''
        },
        validationSchema,
        onSubmit: (values: { customer: IUser, product: IProduct, quantity: number, currency: string }) => {
            // props.saveOrderDetails(values.customer, values.product, values.quantity, currency)
            console.log(formik.values);
            order.customer = values.customer;
            order.orderItemsList = [...order.orderItemsList]
            order.currency = values.currency;
            order.orderStatus = 'APPROVED'
        }
    });

    const order: IOrder = {
        employee: null,
        customer: {} as IUser,
        totalAmount: 0,
        orderItemsList: [],
        orderStatus: "",
        company: null,
        creditCardNumber: "",
        expiryOn: new Date(),
        cvc: "",
        notificationFlag: true,
        auditData: null,
        currency: ""
    }

    const saveCreditCardDetails = (values: { ccn: string, cvv: string, ed: Date }) => {
        order.creditCardNumber = values.ccn;
        order.cvc = values.cvv;
        order.expiryOn = values.ed;
        setShowCreditCard(false);
    }

    const fillOrder = async () => {
        // const res = await axios.get(`${BASE_URL}/order/${props.orderId}`)
        // const res = await axios.get(`${BASE_URL}/order/64f0906d1afe7a79e1f2e89a`)
        // console.log(res)
    }

    const [showCreditCard, setShowCreditCard] = React.useState(false);

    useEffect(() => {
        fillOrder()
    }, [])

    return <div style={{ width: '100%' }} >
        <form onSubmit={formik.handleSubmit}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center" alignItems="center">
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

                        <Grid item xs={12}>
                            <Button sx={{ backgroundColor: `${PALLETE.BLUE} !important`, width: '100%', display: 'block' }}
                                type="submit" variant="contained" >
                                add
                            </Button>
                        </Grid>

                        <Grid item xs={12} mb={-2} mt={-2}>
                            <p>{`Paid with a credit card ending in digits:${order.creditCardNumber.substring(8, 12)}`}</p>
                        </Grid>

                    </Grid>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: 'end' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }} justifyContent="center" alignItems="center">

                        <Grid item xs={12}>
                            <h3>{`price: ${order.totalAmount}`}</h3>
                        </Grid>

                        <Grid item xs={12}>
                            <h4>products you ordered:</h4>
                            {`${order.orderItemsList.map((value: any) => value)}`}
                        </Grid>

                        <Grid item xs={6}>

                        </Grid>

                    </Grid>
                </Grid>
                <Grid item xs={6} alignItems={'flex-end'} justifyContent={'center'}>

                    <div onClick={() => { setShowCreditCard(!showCreditCard) }}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center" alignItems="center">
                            <Grid item xs={2}><Img src={img} /></Grid>
                            <Grid item xs={10}><Text>Change credit card details</Text></Grid>
                        </Grid>
                    </div>

                    {showCreditCard && <CreditCard saveCreditCardDetails={saveCreditCardDetails} />}
                    <Grid item xs={12} mt={1}>
                        <Button sx={{ backgroundColor: `${PALLETE.ORANGE} !important`, width: '100%', display: 'block' }}
                            type="submit" variant="contained" onClick={(e) => { e.preventDefault(); order.orderStatus = 'PROCESS_CANCELED' }}>
                            Chancel Order
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={6} >
                    <Button sx={{ backgroundColor: `${PALLETE.GREEN} !important`, width: '100%', display: 'block' }}
                        type="submit" variant="contained" onClick={(e) => {
                            e.preventDefault(); console.log(order);
                        }}>
                        Save Changes
                    </Button>
                </Grid>
            </Grid>
        </form >
    </div >
}

export default OrderDetails