import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ErrorState {
  errorMessage: string | null;
  isOpen:boolean | false;
}

const initialState: ErrorState = {
  errorMessage: null,
  isOpen:false,
};



const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      console.log("in setError");
      state.errorMessage = action.payload;
      state.isOpen=true;
      console.log("isOpen",state.isOpen);
    }
    ,
    clearError: (state) => {
      console.log("in clearError");
      state.errorMessage = null;
      state.isOpen=false;
      console.log("in end of clearError");

    },
  },
});

export const { setError, clearError } = errorSlice.actions;

export default errorSlice.reducer;
