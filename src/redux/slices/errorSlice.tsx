import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IErrorState {
  errorMessage: string | null;
  isOpen:boolean | false;
}

const initialState: IErrorState = {
  errorMessage: null,
  isOpen:false,
};



const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
      state.isOpen=true;
    }
    ,
    clearError: (state) => {
      state.errorMessage = null;
      state.isOpen=false;

    },
  },
});

export const { setError, clearError } = errorSlice.actions;

export default errorSlice.reducer;
