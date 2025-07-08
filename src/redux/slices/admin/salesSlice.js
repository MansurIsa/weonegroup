import { createSlice } from '@reduxjs/toolkit';

const SalesSlice = createSlice({
    name: 'sales',
    initialState: {
        salesList: [],
        customerId: null,      // Yeni əlavə
        saleDate: null         // Yeni əlavə
    },
    reducers: {
        getSalesListFunc: (state, action) => {
            state.salesList = action.payload;
        },
        setCustomerId: (state, action) => {
            state.customerId = action.payload;
        },
        setSaleDate: (state, action) => {
            state.saleDate = action.payload;
        }
    }
});

export const SalesReducer = SalesSlice.reducer;
export const {
    getSalesListFunc,
    setCustomerId,
    setSaleDate
} = SalesSlice.actions;
