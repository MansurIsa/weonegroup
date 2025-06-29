import axios from "axios";
import { baseUrl } from "../../mainApi/MainApi";
import { getBrandListFunc, getCategoryListFunc, getProductsListFunc } from "../../redux/slices/productsSlices";
import { startLoading, stopLoading } from "../../redux/slices/loaderSlice";
import toast from "react-hot-toast";

export const getProductsList = () => async (dispatch) => {
  dispatch(startLoading());
  return await axios.get(`${baseUrl}core/product-list/`)
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
  return await axios.get(`${baseUrl}core/category-list/`)
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
  return await axios.get(`${baseUrl}core/brand-list/`)
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


export const addProductToCart = (data,navigate) => async (dispatch) => {
  dispatch(startLoading());
  return await axios.post(`${baseUrl}core/basketitem-create/`,data,{
    headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
  })
    .then((resp) => {
        console.log(resp);
        toast.success("Məhsul səbətə əlavə edildi");
        navigate("/cart")
    })
    .catch((err) => {
      console.log(err);
       toast.error("Xəta baş verdi. Zəhmət olmasa yenidən yoxlayın ❌");
    }).finally(() => {
      dispatch(stopLoading());
    });;
};
