import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import IOrder from "../../interfaces/model/IOrder"

interface IOrderState {
    orders: Array<IOrder>,
    errorMessage: "",
    shouldDisplayErrorMessage: false
}

const initialState: IOrderState = {
    orders: [],
    errorMessage: "",
    shouldDisplayErrorMessage: false
}

export const orderSlice = createSlice({
    name: 'orderReducer',
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<Array<IOrder>>) => {
            state.orders = action.payload;
        },
    },
})

export const { setOrders } = orderSlice.actions
export default orderSlice.reducer;