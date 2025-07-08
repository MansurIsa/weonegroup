import { createSlice } from '@reduxjs/toolkit';

const IncomeSlice = createSlice({
    name: 'income',
    initialState: {
      
        incomeAddPaymentModal: false,
        expenseAddPaymentModal: false,
        paymentList: [],
        expenseList: []
    },
    reducers: {

        handleIncomeAddPaymentModal: (state,action)=>{
            state.incomeAddPaymentModal=true
        },
        handleExpenseAddPaymentModal: (state,action)=>{
            state.expenseAddPaymentModal=true
        },
         closeIncomeAddPaymentModal: (state,action)=>{
            state.incomeAddPaymentModal=false
            state.expenseAddPaymentModal=false
        },
        getPaymentListFunc: (state,action)=>{
            state.paymentList=action.payload
        },
         getExpenseListFunc: (state,action)=>{
            state.expenseList=action.payload
        }
    }
});

export const IncomeReducer = IncomeSlice.reducer;
export const {handleIncomeAddPaymentModal,closeIncomeAddPaymentModal,getPaymentListFunc,handleExpenseAddPaymentModal,
    getExpenseListFunc
} = IncomeSlice.actions;
