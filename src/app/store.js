import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "../features/Transation/transactionSlice"

export const store = configureStore({
    reducer: {
        transactions: transactionReducer
    },
});
