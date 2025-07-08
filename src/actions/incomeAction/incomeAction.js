import axios from "axios";
import { baseUrl } from "../../mainApi/MainApi";
import { startLoading, stopLoading } from "../../redux/slices/loaderSlice";
import toast from "react-hot-toast";
import { getPaymentListFunc } from "../../redux/slices/admin/incomeSlices";

export const getPaymentList = () => async (dispatch) => {
  dispatch(startLoading());
  return await axios.get(`${baseUrl}accounting/payment-list/`)
    .then((resp) => {
        console.log(resp.data);
      dispatch(getPaymentListFunc(resp.data));
    })
    .catch((err) => {
      console.log(err);
    }).finally(() => {
      dispatch(stopLoading());
    });;
};
