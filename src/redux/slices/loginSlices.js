import { createSlice } from '@reduxjs/toolkit';

const LoginSlice = createSlice({
    name: 'login',
    initialState: {
      userObj: {},
      usersList: [],
      customerMovementList: [],
      customerFactureList: []
    },
    reducers: {
       getUserObjFunc: (state,action)=>{
        state.userObj=action.payload
       },
        logoutFunc: (state) => {
            state.userObj = {}; // istifadəçi məlumatını təmizlə
        },
        getUsersListFunc: (state,action)=>{
            state.usersList=action.payload
        },
        getCustomerMovementListFunc:(state,action)=>{
            state.customerMovementList=action.payload
        },
        getCustomerFactureListFunc:(state,action)=>{
            state.customerFactureList=action.payload
        },
    }
});

export const LoginReducer = LoginSlice.reducer;
export const {getUserObjFunc,logoutFunc,getUsersListFunc,getCustomerMovementListFunc,
    getCustomerFactureListFunc
} = LoginSlice.actions;
