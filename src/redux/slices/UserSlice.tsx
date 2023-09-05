import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import IUser from '../../interfaces/model/IUser'

interface IUserState {
    users: Array<IUser>,
    errorMessage: "",
    shouldDisplayErrorMessage: false
}

const initialState: IUserState = {
    users: [],
    errorMessage: "",
    shouldDisplayErrorMessage: false
}

export const userSlice = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<Array<IUser>>) => {
            state.users = action.payload;
        },
    },
})


export const { setUsers } = userSlice.actions
export default userSlice.reducer;