import { createSlice } from "@reduxjs/toolkit";

const chatslice=createSlice({
    name:"chat",
    initialState:{
        chatsdata:{},
    },
    reducers:{
       setchatsdata:(state,action)=>{
       state.chatsdata={...action.payload.chatsdata};
       }

    }

})
export const setchatsdata=chatslice.actions.setchatsdata;
export default chatslice.reducer;