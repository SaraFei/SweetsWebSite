import { configureStore } from "@reduxjs/toolkit";
import sweetSlice from "../feature/sweets/sweetSlice";
import basketSlice from "../basket/basketSlice.js";
import userSlice from "../feature/user/userSlice.js";

export const store = configureStore({
    reducer:{
        sweetState:sweetSlice,
        basketState:basketSlice,
        userState:userSlice
    }
});