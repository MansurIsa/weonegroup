import { createSlice } from '@reduxjs/toolkit';

const SalesSlice = createSlice({
    name: 'sales',
    initialState: {
        salesList: []
     
    },
    reducers: {
        getSalesListFunc: (state,action)=>{
            state.salesList=action.payload
        }
    
    }
});

export const SalesReducer = SalesSlice.reducer;
export const {getSalesListFunc} = SalesSlice.actions;
