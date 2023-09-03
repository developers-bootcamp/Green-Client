import currencyReducer from './slices/currencySlice';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice';
import productReducer from './slices/productSlice';
import loadingReducer from './slices/loadingSlice';
import { useDispatch } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import errorReducer from './slices/errorSlice';

export const store = configureStore({
    reducer: {
        loadingReducer,
        orderReducer,
        currencyReducer,
        userReducer,
        productReducer,
        errorReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;