import { Button, FormHelperText, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { PALLETE } from '../../../../config/config';
import MyAutocomplete from '../../../../components/MyAutocomplete';
import IProduct from '../../../../interfaces/model/IProduct';
import IUser from '../../../../interfaces/model/IUser';
import { getProductsAutocomplete } from '../../../../apiCalls/productCalls';
import { getCustomersAutocomplete } from '../../../../apiCalls/userCalls';

const validationSchema = yup.object({
    customer: yup.object().required('customer is required'),
    product: yup.object().required('product is required')
});

const AddProduct: React.FC = (props) => {

    const formik = useFormik({
        initialValues: {
            customer: {} as IUser,
            product: {} as IProduct,
        },
        validationSchema,
        onSubmit: (values: { customer: IUser, product: IProduct }) => {
            // props.saveCreditCardDetails(values)
            console.log(values);
        }
    });

    return <div style={{ width: '100%' }} >
        <form onSubmit={formik.handleSubmit}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center" alignItems="center">

                <Grid item xs={6}>
                    <Grid item xs={12}>
                        <FormHelperText>customer</FormHelperText>
                        <MyAutocomplete getFunction={getCustomersAutocomplete}
                            setItem={(chosen: IUser) => { formik.values.customer = chosen }} displayField={1} />
                    </Grid>

                    <Grid item xs={12} mb={2}>
                        <FormHelperText>product</FormHelperText>
                        <MyAutocomplete getFunction={getProductsAutocomplete}
                            setItem={(chosen: IProduct) => { formik.values.product = chosen }} displayField={1} />
                    </Grid>

                    <Button sx={{ backgroundColor: `${PALLETE.BLUE} !important`, width: '100%', display: 'block' }}
                        type="submit" variant="contained" >
                        add
                    </Button>
                </Grid>

                <Grid item xs={6}>
                    <p>he have other things</p>
                </Grid>

            </Grid>
        </form >
    </div >

}

export default AddProduct