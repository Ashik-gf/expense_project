import { addTransaction, deleteTransaction, editTransaction, getTransaction } from "./transactionAPI"

const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit")

//  initialState
const initialState ={
    transactions : [],
    isLoading: true,
    isError : false,
    error: " ",
    editing: {}
}
// create Thunk Finction
 export const fetchTransaction =createAsyncThunk("transactions/fetchTransaction", async()=>{
const transactions = await getTransaction();
return transactions;
})
// createTransactions
export const createTransaction =createAsyncThunk("transactions/createTransaction", async(data)=>{
    const transactions = await addTransaction(data);
    return transactions;
    })
// updateTransactions
export const changeTransaction =createAsyncThunk("transactions/changeTransaction", async({id, data})=>{
    const transactions = await editTransaction(id,data);
    return transactions;
    })
// updateTransactions
export const removeTransaction =createAsyncThunk("transactions/deleteTransaction", async(id)=>{
    const transactions = await deleteTransaction(id);
    return transactions;
    })

    //  create Slice transaction
    const transactionSlice = createSlice({
        name:"transaction",
        initialState,
        reducers:{
            activeEditing:(state, action)=>{
                state.editing = action.payload
            },
            inactiveEditing:(state, action)=>{
                state.editing = {};
            },

        },
        extraReducers:(builder)=>{
            builder
            .addCase(fetchTransaction.pending, (state)=>{
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchTransaction.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isError = false;
                state.transactions = action.payload;
            })
            .addCase(fetchTransaction.rejected, (state, action)=>{
                state.isLoading = false;
                state.isError = true;
                state.transactions = [];
                state.error = action.error?.message
            })
            // for post reducers
            .addCase(createTransaction.pending, (state)=>{
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(createTransaction.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isError = false;
                // we can immudated state hare... and can put data in state.transaction
                state.transactions.push(action.payload) 
                
            })
            .addCase(createTransaction.rejected, (state, action)=>{
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message
            })
            // for update
            .addCase(changeTransaction.pending, (state)=>{
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(changeTransaction.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isError = false;
                // al first i have to find the index of
                const indexToUpdate = state.transactions.findIndex(t=>t.id === action.payload.id)
                state.transactions[indexToUpdate] = action.payload;
            })
            .addCase(changeTransaction.rejected, (state, action)=>{
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message
            })
            // delete
            .addCase(removeTransaction.pending, (state)=>{
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(removeTransaction.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isError = false;
               state.transactions = state.transactions.filter(t => t.id !== action.meta.arg)
            })
            .addCase(removeTransaction.rejected, (state, action)=>{
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message
            })
        }
        
    })
export default transactionSlice.reducer;
export const {activeEditing, inactiveEditing}= transactionSlice.actions