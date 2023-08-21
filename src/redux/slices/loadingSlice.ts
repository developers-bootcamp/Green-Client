import { createSlice, PayloadAction } from '@reduxjs/toolkit';

<<<<<<<< HEAD:src/redux/slices/loadingSlice.ts
interface AppState {
========
interface ILoadingState {
>>>>>>>> 2d2acaa7ea6ce98d06cbf97780f1952e55908a23:src/redux/slices/loadingSlice.tsx
  isLoading: boolean;
  requestCounter: number,
}

<<<<<<<< HEAD:src/redux/slices/loadingSlice.ts
const initialState: AppState = {
  isLoading: false,
  requestCounter:0,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      console.log("in setLoading");
      if(action.payload)
        state.requestCounter++;
      else
        state.requestCounter--;
      state.isLoading = state.requestCounter>0;
========
const initialState: ILoadingState = {
  isLoading: false,
  requestCounter: 0,
};

export const LoadingSlice = createSlice({
  name: 'loadingReducer',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      if (action.payload)
        state.requestCounter++;
      else
        state.requestCounter--;
      state.isLoading = state.requestCounter > 0;
>>>>>>>> 2d2acaa7ea6ce98d06cbf97780f1952e55908a23:src/redux/slices/loadingSlice.tsx
    },
  },
});

<<<<<<<< HEAD:src/redux/slices/loadingSlice.ts
export const { setLoading } = appSlice.actions;

export default appSlice.reducer;
========
export const { setLoading } = LoadingSlice.actions;

export default LoadingSlice.reducer;
>>>>>>>> 2d2acaa7ea6ce98d06cbf97780f1952e55908a23:src/redux/slices/loadingSlice.tsx
