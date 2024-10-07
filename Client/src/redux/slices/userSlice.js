import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userDetails: null
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.userDetails = action.payload;
        },
        clearUser:(state)=>{
            state.userDetails = null
            localStorage.removeItem('token');
        }
    }
})

export const {setUser,clearUser} = userSlice.actions;
export default userSlice.reducer