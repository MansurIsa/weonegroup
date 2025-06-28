import { createSlice } from '@reduxjs/toolkit';

const ProductTableSlice = createSlice({
    name: 'productTable',
    initialState: {
      isModalOpen: false
     
    },
    reducers: {
    handleOpenModal: (state,action)=>{
        state.isModalOpen=true
    },
    handleCloseModal: (state,action)=>{
        state.isModalOpen=false
    },
    
    }
});

export const ProductTableReducer = ProductTableSlice.reducer;
export const {handleOpenModal,handleCloseModal} = ProductTableSlice.actions;
