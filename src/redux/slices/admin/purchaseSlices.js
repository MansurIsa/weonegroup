import { createSlice } from '@reduxjs/toolkit';

const PurchaseSlice = createSlice({
    name: 'purchase',
    initialState: {
        purchaseList: []
     
    },
    reducers: {
        getPurchaseListFunc: (state,action)=>{
            state.purchaseList=action.payload
        }
    
    }
});

export const PurchaseReducer = PurchaseSlice.reducer;
export const {getPurchaseListFunc} = PurchaseSlice.actions;
