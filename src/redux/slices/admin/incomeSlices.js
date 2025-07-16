import { createSlice } from '@reduxjs/toolkit';

const IncomeSlice = createSlice({
    name: 'income',
    initialState: {

        incomeAddPaymentModal: false,
        expenseAddPaymentModal: false,
        paymentList: [],
        expenseList: [],
        incomeUpdatePaymentModal: false,
        incomeUpdatePaymentObj: {},
        incomeDeletePaymentModal: false,
        incomeDeletePaymentId: "",

        expenseDeletePaymentModal: false,
        expenseUpdatePaymentModal: false,
        expenseUpdatePaymentObj: {},
        expenseDeletePaymentId: "",
    },
    reducers: {

        handleIncomeAddPaymentModal: (state, action) => {
            state.incomeAddPaymentModal = true
        },
        handleExpenseAddPaymentModal: (state, action) => {
            state.expenseAddPaymentModal = true
        },
        closeIncomeAddPaymentModal: (state, action) => {
            state.incomeAddPaymentModal = false
            state.expenseAddPaymentModal = false
            state.incomeUpdatePaymentModal = false
            state.incomeDeletePaymentModal = false
            state.expenseUpdatePaymentModal=false
            state.expenseDeletePaymentModal=false
        },
        getPaymentListFunc: (state, action) => {
            state.paymentList = action.payload
        },
        getExpenseListFunc: (state, action) => {
            state.expenseList = action.payload
        },
        handleIncomeUpdatePaymentModal: (state, action) => {
            state.incomeUpdatePaymentModal = true
            state.incomeUpdatePaymentObj = action.payload
        },
        deleteIncomePaymentModal: (state, action) => {
            state.incomeDeletePaymentModal = true
            state.incomeDeletePaymentId = action.payload
        },
        handleExpenseUpdatePaymentModal: (state, action) => {
            state.expenseUpdatePaymentModal = true
            state.expenseUpdatePaymentObj = action.payload
        },
        deleteExpensePaymentModal: (state, action) => {
            state.expenseDeletePaymentModal = true
            state.expenseDeletePaymentId = action.payload
        }

    }
});

export const IncomeReducer = IncomeSlice.reducer;
export const { handleIncomeAddPaymentModal, closeIncomeAddPaymentModal, getPaymentListFunc, handleExpenseAddPaymentModal,

    getExpenseListFunc, handleIncomeUpdatePaymentModal, deleteIncomePaymentModal,
    handleExpenseUpdatePaymentModal,deleteExpensePaymentModal
} = IncomeSlice.actions;
