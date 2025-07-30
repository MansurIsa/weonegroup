import { createSlice } from '@reduxjs/toolkit';

const PurchaseSlice = createSlice({
    name: 'purchase',
    initialState: {
        purchaseList: [],
        purchaseUpdateModal: false,
        purchaseId: "",
        updatePurchaseObj: {},
        purchaseListList: [],
        supplierPurchaseObj: {},
        purchaseDeleteModal: false,
        purchaseDeleteId: ""
     
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
            state.purchaseDeleteModal=false
        },
        setUpdatePurchaseObjFunc: (state,action)=>{
            state.updatePurchaseObj=action.payload
        },
        getPurchaseListListFunc: (state,action)=>{
            state.purchaseListList=action.payload
        },
        getPurchaseSupplierObjFunc: (state,action)=>{
            state.supplierPurchaseObj=action.payload
        },
        purchaseDeleteModalFunc: (state,action)=>{
            state.purchaseDeleteModal=true
            state.purchaseDeleteId=action.payload
        }
    
    }
});

export const PurchaseReducer = PurchaseSlice.reducer;
export const {getPurchaseListFunc,closePurchaseUpdateModalFunc,purchaseUpdateModalFunc,setUpdatePurchaseObjFunc,
    getPurchaseListListFunc,getPurchaseSupplierObjFunc,purchaseDeleteModalFunc
} = PurchaseSlice.actions;
