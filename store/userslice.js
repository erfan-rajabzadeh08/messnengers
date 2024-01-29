import { createSlice } from "@reduxjs/toolkit";

const userslice=createSlice({
    name:"users",
    initialState:{
        storedusers:{},
    },
    reducers:{
       setstoredusers:(state,action)=>{
        const newusers=action.payload.newusers
        const existingusers=state.storedusers
        const usersarray=Object.values(newusers)
        for(let i=0;i<usersarray.length;i++ ){
          const userdata=usersarray[i];
          existingusers[userdata.userId]=userdata;
        }
       state.storedusers=existingusers;
       }

    }

})
export const setstoredusers=userslice.actions.setstoredusers;
export default userslice.reducer;