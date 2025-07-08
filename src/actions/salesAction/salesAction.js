import axios from "axios";
import { baseUrl } from "../../mainApi/MainApi";
import { startLoading, stopLoading } from "../../redux/slices/loaderSlice";
import toast from "react-hot-toast";
import { getSalesListFunc } from "../../redux/slices/admin/salesSlice";

export const getSalesList = () => async (dispatch) => {
  dispatch(startLoading());
  return await axios.get(`${baseUrl}accounting/sale-list/`)
    .then((resp) => {
        console.log(resp.data);
      dispatch(getSalesListFunc(resp.data));
    })
    .catch((err) => {
      console.log(err);
    }).finally(() => {
      dispatch(stopLoading());
    });;
};

