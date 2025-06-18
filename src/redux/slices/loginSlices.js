import { createSlice } from '@reduxjs/toolkit';

const LoginSlice = createSlice({
    name: 'login',
    initialState: {
      userObj: {}
    },
    reducers: {
       getUserObjFunc: (state,action)=>{
        state.userObj=action.payload
       },
        logoutFunc: (state) => {
            state.userObj = {}; // istifadəçi məlumatını təmizlə
        }
    }
});

export const LoginReducer = LoginSlice.reducer;
export const {getUserObjFunc,logoutFunc} = LoginSlice.actions;
