import { createSlice } from "@reduxjs/toolkit";

const messageslice=createSlice({
    name:"messages",
    initialState:{
        messagesData:{},
    },
    reducers:{
          setchatmessages:(state,action)=>{
         const existingMessages=state.messagesData

         const {chatid,messagesData}=action.payload

         existingMessages[chatid]=messagesData;

         state.messagesData=existingMessages;
       }

    }

});
export const setchatmessages=messageslice.actions.setchatmessages;
export default messageslice.reducer;