import { createSlice } from '@reduxjs/toolkit';

const ProductTableSlice = createSlice({
    name: 'productTable',
    initialState: {
      isModalOpen: false,
      productId: "",
      productsMovementList: [],
      returnBackList: [],
      productReturnedModal: false
     
    },
    reducers: {
    handleOpenModal: (state,action)=>{
        state.isModalOpen=true
    },
    handleCloseModal: (state,action)=>{
        state.isModalOpen=false
        state.productReturnedModal=false
    },
    setSelectedProduct: (state,action)=>{
        state.productId=action.payload
    },
    getProductMovementListFunc: (state,action)=>{
        state.productsMovementList=action.payload
    },
    getReturnBackListFunc: (state,action)=>{
        state.returnBackList=action.payload
    },
    handleAddReturnedModal: (state,action)=>{
        state.productReturnedModal=true
    }
    
    }
});

export const ProductTableReducer = ProductTableSlice.reducer;
export const {handleOpenModal,handleCloseModal,setSelectedProduct,getProductMovementListFunc,
    getReturnBackListFunc,handleAddReturnedModal
} = ProductTableSlice.actions;
