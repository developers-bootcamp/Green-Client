import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IRoleState {
  avilableRole: String;
}

const initialState: IRoleState = {
    avilableRole: "",
};

const roleSlice = createSlice({
  name: 'role', 
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<String>) => {
      state.avilableRole =action.payload;
    },
  },
});

export const { setRole } = roleSlice.actions; 
export default roleSlice.reducer;
