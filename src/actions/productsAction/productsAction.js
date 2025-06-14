import axios from "axios";
import { baseUrl } from "../../mainApi/MainApi";
import { getBrandListFunc, getCategoryListFunc, getProductsListFunc } from "../../redux/slices/productsSlices";

export const getProductsList = () => async (dispatch) => {
//   dispatch(isLoading());
  return await axios.get(`${baseUrl}product-list/`)
    .then((resp) => {
        console.log(resp.data);
        
    //   dispatch(stopLoading());
      dispatch(getProductsListFunc(resp.data));
    })
    .catch((err) => {
      console.log(err);
    //   dispatch(stopLoading());
    });
};


export const getCategoryList = () => async (dispatch) => {
//   dispatch(isLoading());
  return await axios.get(`${baseUrl}category-list/`)
    .then((resp) => {
        console.log(resp.data);
        
    //   dispatch(stopLoading());
      dispatch(getCategoryListFunc(resp.data));
    })
    .catch((err) => {
      console.log(err);
    //   dispatch(stopLoading());
    });
};

export const getBrandList = () => async (dispatch) => {
//   dispatch(isLoading());
  return await axios.get(`${baseUrl}brand-list/`)
    .then((resp) => {
        console.log(resp.data);
        
    //   dispatch(stopLoading());
      dispatch(getBrandListFunc(resp.data));
    })
    .catch((err) => {
      console.log(err);
    //   dispatch(stopLoading());
    });
};