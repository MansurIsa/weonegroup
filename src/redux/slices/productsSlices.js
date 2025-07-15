import { createSlice } from "@reduxjs/toolkit";

const ProductsSlice = createSlice({
  name: "products",
  initialState: {
    productsList: [],
    categoryList: [],
    brandList: [],
    storeList: [],
    productObj: {}
  },
  reducers: {
    getProductsListFunc: (state, action) => {
      state.productsList=action.payload
    },
    getCategoryListFunc: (state, action) => {
      state.categoryList=action.payload
    },
     getBrandListFunc: (state, action) => {
      state.brandList=action.payload
    },
    getStoreListFunc: (state, action) => {
      state.storeList=action.payload
    },
    getProductObjFunc: (state,action)=>{
      state.productObj=action.payload
    }
  },
});

export const ProductsReducer = ProductsSlice.reducer;
export const { getProductsListFunc,getCategoryListFunc,getBrandListFunc,getStoreListFunc,getProductObjFunc} = ProductsSlice.actions;
