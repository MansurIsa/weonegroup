import axios from "axios";
import { baseUrl } from "../../mainApi/MainApi";
import { getBrandListFunc, getCategoryListFunc, getProductsListFunc } from "../../redux/slices/productsSlices";
import { startLoading, stopLoading } from "../../redux/slices/loaderSlice";

export const getProductsList = () => async (dispatch) => {
  dispatch(startLoading());
  return await axios.get(`${baseUrl}product-list/`)
    .then((resp) => {
        console.log(resp.data);
      dispatch(getProductsListFunc(resp.data));
    })
    .catch((err) => {
      console.log(err);
    }).finally(() => {
      dispatch(stopLoading());
    });;
};


export const getCategoryList = () => async (dispatch) => {
  dispatch(startLoading());
  return await axios.get(`${baseUrl}category-list/`)
    .then((resp) => {
        console.log(resp.data);
      dispatch(getCategoryListFunc(resp.data));
    })
    .catch((err) => {
      console.log(err);
    }).finally(() => {
      dispatch(stopLoading());
    });;
};

export const getBrandList = () => async (dispatch) => {
  dispatch(startLoading());
  return await axios.get(`${baseUrl}brand-list/`)
    .then((resp) => {
        console.log(resp.data);
      dispatch(getBrandListFunc(resp.data));
    })
    .catch((err) => {
      console.log(err);
    }).finally(() => {
      dispatch(stopLoading());
    });;
};