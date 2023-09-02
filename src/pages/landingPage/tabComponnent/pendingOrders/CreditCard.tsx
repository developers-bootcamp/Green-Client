import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import React from "react";
import { FormHelperText, Grid } from "@mui/material";
import { PALLETE } from '../../../../config/config';

const validationSchema = yup.object({
    ccn: yup.string().required('Credit card number is required').min(16, "credit card number is too short").max(16, "credit card number is too long").matches(/^\d+$/, 'The field should have digits only'),
    cvv: yup.string().min(3, "cvv must have 3 digits").max(3, "cvv must have 3 digits").required("cvv is required").matches(/^\d+$/, 'The field should have digits only'),
    ed: yup.date().required("expire date is required")
});

const CreditCard = (props: any) => {

    const formik = useFormik({
        initialValues: {
            ccn: '',
            cvv: '',
            ed: new Date()
        },
        validationSchema,
        onSubmit: (values: { ccn: string, cvv: string, ed: Date }) => {
            props.saveCreditCardDetails(values)
        }
    });

    return (
        <div style={{ width: '100%' }} >
            <form onSubmit={formik.handleSubmit}>
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

                    <Button sx={{ backgroundColor: `${PALLETE.YELLOW} !important`, width: '10rem', display: 'block' }}
                        type="submit" variant="contained" >
                        ok
                    </Button>

                </Grid>
            </form >
        </div >
    );
};

export default CreditCard;