import currencyReducer from './slices/CurrencySlice';
import orderReducer from './slices/OrderSlice';
import userReducer from './slices/UserSlice';
import productReducer from './slices/ProductSlice';
import loadingReducer from './slices/loadingSlice';
import { useDispatch } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        loadingReducer,
        orderReducer,
        currencyReducer,
        userReducer,
        productReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;