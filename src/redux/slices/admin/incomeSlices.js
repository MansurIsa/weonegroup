import { createSlice } from '@reduxjs/toolkit';

const IncomeSlice = createSlice({
    name: 'income',
    initialState: {
      
        incomeAddPaymentModal: false,
        paymentList: []
    },
    reducers: {

        handleIncomeAddPaymentModal: (state,action)=>{
            state.incomeAddPaymentModal=true
        },
         closeIncomeAddPaymentModal: (state,action)=>{
            state.incomeAddPaymentModal=false
        },
        getPaymentListFunc: (state,action)=>{
            state.paymentList=action.payload
        }
    }
});

export const IncomeReducer = IncomeSlice.reducer;
export const {handleIncomeAddPaymentModal,closeIncomeAddPaymentModal,getPaymentListFunc} = IncomeSlice.actions;
