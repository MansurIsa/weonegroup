import { createSlice } from '@reduxjs/toolkit';

const PurchaseSlice = createSlice({
    name: 'purchase',
    initialState: {
        purchaseList: [],
        purchaseUpdateModal: false,
        purchaseId: "",
        updatePurchaseObj: {}
     
    },
    reducers: {
        getPurchaseListFunc: (state,action)=>{
            state.purchaseList=action.payload
        },
        purchaseUpdateModalFunc: (state,action)=>{
            state.purchaseUpdateModal=true
            state.purchaseId=action.payload
        },
        closePurchaseUpdateModalFunc: (state,action)=>{
            state.purchaseUpdateModal=false
        },
        setUpdatePurchaseObjFunc: (state,action)=>{
            state.updatePurchaseObj=action.payload
        },
    
    }
});

export const PurchaseReducer = PurchaseSlice.reducer;
export const {getPurchaseListFunc,closePurchaseUpdateModalFunc,purchaseUpdateModalFunc,setUpdatePurchaseObjFunc} = PurchaseSlice.actions;
