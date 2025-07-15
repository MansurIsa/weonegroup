import { createSlice } from '@reduxjs/toolkit';

const ProductTableSlice = createSlice({
    name: 'productTable',
    initialState: {
      isModalOpen: false,
      productId: "",
      productsMovementList: [],
      returnBackList: [],
      productReturnedModal: false,
      productsDeleteModal: false,
      productDeleteId: "",
      productUpdateObj: {}
     
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
    },
    productsDeleteModalFunc: (state,action)=>{
        state.productsDeleteModal=true
        state.productDeleteId=action.payload
    },
    closeProductsDeleteModalFunc: (state)=>{
        state.productsDeleteModal=false
    },
    setUpdateProductsObjFunc: (state,action)=>{
        state.productUpdateObj=action.payload
    }
    
    }
});

export const ProductTableReducer = ProductTableSlice.reducer;
export const {handleOpenModal,handleCloseModal,setSelectedProduct,getProductMovementListFunc,
    getReturnBackListFunc,handleAddReturnedModal,productsDeleteModalFunc,closeProductsDeleteModalFunc,
    setUpdateProductsObjFunc
} = ProductTableSlice.actions;
