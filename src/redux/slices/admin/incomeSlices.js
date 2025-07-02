import { createSlice } from '@reduxjs/toolkit';

const IncomeSlice = createSlice({
    name: 'income',
    initialState: {
      
        incomeAddPaymentModal: false
    },
    reducers: {

        handleIncomeAddPaymentModal: (state,action)=>{
            state.incomeAddPaymentModal=true
        },
         closeIncomeAddPaymentModal: (state,action)=>{
            state.incomeAddPaymentModal=false
        }
    }
});

export const IncomeReducer = IncomeSlice.reducer;
export const {handleIncomeAddPaymentModal,closeIncomeAddPaymentModal} = IncomeSlice.actions;
