import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "./inventoryReducer";

export default configureStore({
    reducer: {
        inventory: inventoryReducer
    },
})
