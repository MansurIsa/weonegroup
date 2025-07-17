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
        productUpdateObj: {},
        productReturnUpdateObj: {},
        productReturnUpdateModal: false,
        productReturnDeleteModal: false,
        productReturnDeleteId: ""

    },
    reducers: {
        handleOpenModal: (state, action) => {
            state.isModalOpen = true
        },
        handleCloseModal: (state, action) => {
            state.isModalOpen = false
            state.productReturnedModal = false
            state.productReturnUpdateModal=false
             state.productReturnDeleteModal=false
        },
        setSelectedProduct: (state, action) => {
            state.productId = action.payload
        },
        getProductMovementListFunc: (state, action) => {
            state.productsMovementList = action.payload
        },
        getReturnBackListFunc: (state, action) => {
            state.returnBackList = action.payload
        },
        handleAddReturnedModal: (state, action) => {
            state.productReturnedModal = true
        },
        productsDeleteModalFunc: (state, action) => {
            state.productsDeleteModal = true
            state.productDeleteId = action.payload
        },
        closeProductsDeleteModalFunc: (state) => {
            state.productsDeleteModal = false
        },
        setUpdateProductsObjFunc: (state, action) => {
            state.productUpdateObj = action.payload
        },
        handleProductReturnUpdateModalFunc: (state, action) => {
            state.productReturnUpdateObj=action.payload
            state.productReturnUpdateModal=true
        },
        deleteProductReturnModalFunc: (state, action) => {
            state.productReturnDeleteId=action.payload
            state.productReturnDeleteModal=true
        }

    }
});

export const ProductTableReducer = ProductTableSlice.reducer;
export const { handleOpenModal, handleCloseModal, setSelectedProduct, getProductMovementListFunc,
    getReturnBackListFunc, handleAddReturnedModal, productsDeleteModalFunc, closeProductsDeleteModalFunc,
    setUpdateProductsObjFunc,deleteProductReturnModalFunc,handleProductReturnUpdateModalFunc
} = ProductTableSlice.actions;
