import axios from "axios";
import { baseUrl } from "../../mainApi/MainApi";
import { startLoading, stopLoading } from "../../redux/slices/loaderSlice";
import { getDashboardListFunc, getMostDebtDashboardListFunc, getStockOutDashboardListFunc } from "../../redux/slices/admin/dashboardSlice";

export const getDashboardList = () => async (dispatch) => {
  dispatch(startLoading());
  return await axios.get(`${baseUrl}accounting/dashboard/`)
    .then((resp) => {
      console.log(resp.data);
      dispatch(getDashboardListFunc(resp.data));
    })
    .catch((err) => {
      console.log(err);
    }).finally(() => {
      dispatch(stopLoading());
    });;
};

export const getMostDebtDashboardList = () => async (dispatch) => {
  dispatch(startLoading());
  return await axios.get(`${baseUrl}accounting/mostindebtedcustomers/`)
    .then((resp) => {
      console.log(resp.data);
      dispatch(getMostDebtDashboardListFunc(resp.data));
    })
    .catch((err) => {
      console.log(err);
    }).finally(() => {
      dispatch(stopLoading());
    });;
};

export const getStockOutDashboardList = () => async (dispatch) => {
  dispatch(startLoading());
  return await axios.get(`${baseUrl}accounting/stockoutproducts-list/`)
    .then((resp) => {
      console.log(resp.data);
      dispatch(getStockOutDashboardListFunc(resp.data));
    })
    .catch((err) => {
      console.log(err);
    }).finally(() => {
      dispatch(stopLoading());
    });;
};