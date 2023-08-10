import { configureStore } from '@reduxjs/toolkit';
import appReducer from './loadingSlice';
import errorReducer from './errorSlice';

export interface RootState {
  app: {
    isLoading: boolean;
  };
  error:{
    isOpen:  boolean;
    errorMessage:string;
  }
}

const store = configureStore({
  reducer: {
    app: appReducer,
    error: errorReducer,
  },
});

export default store;
