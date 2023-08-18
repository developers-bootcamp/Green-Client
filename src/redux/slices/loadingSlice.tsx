import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ILoadingState {
  isLoading: boolean;
  requestCounter: number,
}

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
    },
  },
});

export const { setLoading } = LoadingSlice.actions;

export default LoadingSlice.reducer;
