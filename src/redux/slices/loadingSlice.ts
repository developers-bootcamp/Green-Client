import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ILoadingState {
  isLoading: boolean;
  requestCounter: number;
}

const initialState: ILoadingState = {
  isLoading: false,
  requestCounter: 0,
};

const loadingSlice = createSlice({
  name: 'loading', 
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      console.log("in setLoading");
      if (action.payload)
        state.requestCounter++;
      else
        state.requestCounter--;
      state.isLoading = state.requestCounter > 0;
    },
  },
});

export const { setLoading } = loadingSlice.actions; 

export default loadingSlice.reducer;
