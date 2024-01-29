import { createSlice } from "@reduxjs/toolkit";

const authslice=createSlice({
    name:"auth",
    initialState:{
        token:null,
        userdata:null,
        didTryAutoLogin:false
    },
    reducers:{
        authenticate:(state,action)=>{
         const {payload}=action;
         state.token=payload.token;
         state.userdata=payload.userdata;
         state.didTryAutoLogin=true;
        },
       SetDidTryAutoLogin:(state,action)=>{
       state.didTryAutoLogin=true
       },
       logout:(state,action)=>{
        state.token=null;
        state.userdata=null;
        state.didTryAutoLogin=false;
       },
       updateLoggedInUserData:(state,action)=>{
       state.userdata={...state.userdata,...action.payload.newData}
       }

    }

})
export const SetDidTryAutoLogin=authslice.actions.SetDidTryAutoLogin;
export const authenticate=authslice.actions.authenticate;
export const updateLoggedInUserData=authslice.actions.updateLoggedInUserData;
export const logout=authslice.actions.logout;


export default authslice.reducer;