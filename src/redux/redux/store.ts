import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';

export interface RootState {
  app: {
    isLoading: boolean;
  };
}

const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export default store;
