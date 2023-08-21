import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import IProduct from '../../interfaces/model/IProduct'

interface IProductState {
    prooducts: Array<IProduct>,
    errorMessage: "",
    shouldDisplayErrorMessage: false
}

const initialState: IProductState = {
    prooducts: [],
    errorMessage: "",
    shouldDisplayErrorMessage: false
}

export const productSlice = createSlice({
    name: 'productReducer',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Array<IProduct>>) => {
            state.prooducts = action.payload;
        },
    },
})

export const { setProducts } = productSlice.actions
export default productSlice.reducer;