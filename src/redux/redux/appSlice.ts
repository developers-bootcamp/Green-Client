import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  isLoading: boolean;
  requestCounter: number,
}

const initialState: AppState = {
  isLoading: false,
  requestCounter:0,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
     if(action.payload)
        state.requestCounter++;
     else
        state.requestCounter--;
     state.isLoading = state.requestCounter>0;
    },
  },
});

export const { setLoading } = appSlice.actions;

export default appSlice.reducer;
