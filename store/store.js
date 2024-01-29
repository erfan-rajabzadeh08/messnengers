import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import userslice from "./userslice";
import chatslice from "./chatslice";
import messagesslic from "./messagesslic";

export const store=configureStore({
    reducer:{
        auth:authSlice,
        users:userslice,
        chat:chatslice,
        messages:messagesslic
     }
});