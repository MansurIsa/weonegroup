import { createSlice } from '@reduxjs/toolkit';

const StockSlice = createSlice({
    name: 'stock',
    initialState: {
        stockList: []
     
    },
    reducers: {
        getStockListFunc: (state,action)=>{
            state.stockList=action.payload
        }
    
    }
});

export const StockReducer = StockSlice.reducer;
export const {getStockListFunc} = StockSlice.actions;
