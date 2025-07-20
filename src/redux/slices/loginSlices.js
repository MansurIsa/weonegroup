import { createSlice } from '@reduxjs/toolkit';

const LoginSlice = createSlice({
    name: 'login',
    initialState: {
      userObj: {},
      usersList: [],
      customerMovementList: [],
      customerFactureList: {},
      supplierList: [],

      updateCustomerObj: {},
      deleteCustomerId: "",
      customerDeleteModal: false
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
        getSupplierListFunc: (state,action)=>{
            state.supplierList=action.payload
        },

        setUpdateCustomerObjFunc: (state,action)=>{
            state.updateCustomerObj=action.payload
        },
        customerUpdateModalFunc: (state,action)=>{
            state.deleteCustomerId=action.payload
            state.customerDeleteModal=true
        },
        closeCustomerUpdateModalFunc: (state,action)=>{
            state.customerDeleteModal=false
        }
    }
});

export const LoginReducer = LoginSlice.reducer;
export const {getUserObjFunc,logoutFunc,getUsersListFunc,getCustomerMovementListFunc,
    getCustomerFactureListFunc,getSupplierListFunc,setUpdateCustomerObjFunc,customerUpdateModalFunc,
    closeCustomerUpdateModalFunc
} = LoginSlice.actions;
