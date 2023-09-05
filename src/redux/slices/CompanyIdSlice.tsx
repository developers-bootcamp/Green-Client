import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICompanyIdState {
    companyId: String;
}

const initialState: ICompanyIdState = {
    companyId: "",
};

const CompanyIdSlice = createSlice({
  name: 'companyId', 
  initialState,
  reducers: {
    setCompanyId: (state, action: PayloadAction<String>) => {
      state.companyId =action.payload;
    },
  },
});

export const {setCompanyId} = CompanyIdSlice.actions; 
export default CompanyIdSlice.reducer;