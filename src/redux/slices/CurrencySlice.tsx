import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import ICurrencyState from '../../interfaces/ICurrencyState';

const initialState: ICurrencyState = {
    currencies: ["DOLLAR", "SHEKEL", "EURO"],
    errorMessage: "",
    shouldDisplayErrorMessage: false,
}

export const CurrencySlice = createSlice({
    name: 'currencyReducer',
    initialState,
    reducers: {
        setCurrencies: (state, action: PayloadAction<Array<string>> ) => {
            state.currencies = action.payload; 
        },
    },
})

export const { setCurrencies } = CurrencySlice.actions
export default CurrencySlice.reducer