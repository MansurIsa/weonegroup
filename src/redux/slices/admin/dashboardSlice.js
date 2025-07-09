import { createSlice } from '@reduxjs/toolkit';

const DashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
      dashboardList: {},
      mostDebtObj: {},
      stockOutList: []
        
    },
    reducers: {
        getDashboardListFunc: (state,action)=>{
            state.dashboardList=action.payload
        },
        getMostDebtDashboardListFunc: (state,action)=>{
            state.mostDebtObj=action.payload
        },
        getStockOutDashboardListFunc: (state,action)=>{
            state.stockOutList=action.payload
        }
       
    }
});

export const DashboardReducer = DashboardSlice.reducer;
export const {getDashboardListFunc,getMostDebtDashboardListFunc,getStockOutDashboardListFunc
} = DashboardSlice.actions;
