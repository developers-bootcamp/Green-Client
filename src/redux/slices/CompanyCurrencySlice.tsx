import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICompanyCurrencyState {
  companyCurrency: String;
}

const initialState: ICompanyCurrencyState = {
    companyCurrency: "",
};

const companyCurrencySlice = createSlice({
  name: 'companyCurrency', 
  initialState,
  reducers: {
    setCompanyCurrency: (state, action: PayloadAction<String>) => {
      state.companyCurrency =action.payload;
    },
  },
});

export const { setCompanyCurrency } = companyCurrencySlice.actions; 
export default companyCurrencySlice.reducer;