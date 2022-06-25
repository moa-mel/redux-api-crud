import { configureStore } from "@reduxjs/toolkit";
import PostReducer from "./features/postSlice"

export const store = configureStore({
    reducer: {
        app: PostReducer,
    }
})