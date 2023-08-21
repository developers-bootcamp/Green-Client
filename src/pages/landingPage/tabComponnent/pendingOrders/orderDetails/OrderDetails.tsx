import { Form } from 'formik';
import { TextField, Grid } from '@mui/material';
import CreditCard from '../CreditCard';
import AddProduct from '../AddProduct';
import IOrder from '../../../../../interfaces/model/IOrder';
import IUser from '../../../../../interfaces/model/IUser';
import { fontSize, margin } from '@mui/system';

const OrderDetails: React.FC = (props: any) => {

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

    return <>
        <AddProduct />
        <p style={{ fontSize: '15px',color:'black' }}>{`paid with a credit card ending in digits: ${order}`}</p >
        <CreditCard />
    </>
}

export default OrderDetails