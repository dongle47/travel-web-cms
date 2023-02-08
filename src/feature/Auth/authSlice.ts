import { RootState } from './../../app/store';
import { createSlice } from "@reduxjs/toolkit";


interface AuthState{
    user: User | null
}
interface User{
    username: string;
    password: string
}

const initialState:AuthState = {
    user: null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {

    }
})

//actions
export const authActions = authSlice.actions

//selector
export const selectUser = (state:RootState) => state.auth.user

//reducers
const authReducer = authSlice.reducer
export default authReducer