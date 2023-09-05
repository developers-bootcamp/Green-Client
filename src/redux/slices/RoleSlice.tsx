import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IRoleState {
  role: String;
}

const initialState: IRoleState = {
    role: "",
};

const roleSlice = createSlice({
  name: 'role', 
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<String>) => {
      state.role =action.payload;
    },
  },
});

export const { setRole } = roleSlice.actions; 
export default roleSlice.reducer;