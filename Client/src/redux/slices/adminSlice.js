import { createSlice } from "@reduxjs/toolkit";

const initialState={
    adminDetails:null
}

const adminSlice=createSlice({
    name:"admin",
    initialState,
    reducers:{
        setAdmin:(state,action)=>{
             state.adminDetails=action.payload
        },
        clearAdmin:(state)=>{
            state.adminDetails=null;
            localStorage.removeItem("adminToken")
        }
    }
})

export const {setAdmin,clearAdmin}=adminSlice.actions;
export default adminSlice.reducer;