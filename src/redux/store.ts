import orderReducer from './slices/CurrencySlice';
import currencyReducer from './slices/CurrencySlice';
import userReducer from './slices/UserSlice';
import productReducer from './slices/ProductSlice';
import loadingReducer from './slices/LoadingSlice';
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