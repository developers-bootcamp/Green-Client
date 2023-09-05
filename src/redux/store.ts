import currencyReducer from './slices/CurrencySlice';
import orderReducer from './slices/OrderSlice';
import userReducer from './slices/UserSlice';
import productReducer from './slices/ProductSlice';
import loadingReducer from './slices/loadingSlice';
import { useDispatch } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import errorReducer from './slices/errorSlice';
import roleReducer from './slices/RoleSlice';
import companyIdReducer from './slices/CompanyIdSlice';

export const store = configureStore({
    reducer: {
        loadingReducer,
        orderReducer,
        currencyReducer,
        userReducer,
        productReducer,
        errorReducer,
        roleReducer,
        companyIdReducer,

    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;