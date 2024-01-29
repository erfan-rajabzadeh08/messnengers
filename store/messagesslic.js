import { createSlice } from "@reduxjs/toolkit";

const messageslice=createSlice({
    name:"messages",
    initialState:{
        messagesData:{},
        starredMessages:{},
    },
    reducers:{
          setchatmessages:(state,action)=>{
         const existingMessages=state.messagesData

         const {chatid,messagesData}=action.payload

         existingMessages[chatid]=messagesData;

         state.messagesData=existingMessages;
       },
       addStarredMessage:(state,action)=>{
          const{starredMessageData}=action.payload;
          state.starredMessages[starredMessageData.messageId]=starredMessageData
       },
       removeStarredMessage:(state,action)=>{
        const{messageId}=action.payload;
        delete state.starredMessages[messageId];
     },
       setStarredMessages:(state,action)=>{
        const{starredMessages}=action.payload;
         state.starredMessages={...starredMessages }
     },
    }

});
export const {setchatmessages,addStarredMessage,removeStarredMessage,setStarredMessages}=messageslice.actions;

export default messageslice.reducer;