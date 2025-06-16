import axios from "axios";
import { baseUrl } from "../../mainApi/MainApi";
import { getBasketItemListFunc } from "../../redux/slices/basketSlice";

export const getBasketItemList = () => async (dispatch) => {
//   dispatch(isLoading());
  return await axios.get(`${baseUrl}user-basketitem-list/`,{
    headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
  })
    .then((resp) => {
        console.log(resp.data);
        
    //   dispatch(stopLoading());
      dispatch(getBasketItemListFunc(resp.data));
    })
    .catch((err) => {
      console.log(err);
    //   dispatch(stopLoading());
    });
};

export const basketClear = (data) => async (dispatch) => {
//   dispatch(isLoading());
  return await axios.post(`${baseUrl}basketitem-clean/`,data,{
    headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
  })
    .then((resp) => {
        console.log(resp.data);
        
    //   dispatch(stopLoading());
    //   dispatch(getBasketItemListFunc(resp.data));
    })
    .catch((err) => {
      console.log(err);
    //   dispatch(stopLoading());
    });
};