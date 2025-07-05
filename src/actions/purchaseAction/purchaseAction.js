import axios from "axios";
import { baseUrl } from "../../mainApi/MainApi";
import { startLoading, stopLoading } from "../../redux/slices/loaderSlice";
import toast from "react-hot-toast";
import { getPurchaseListFunc } from "../../redux/slices/admin/purchaseSlices";

export const getPurchaseList = () => async (dispatch) => {
  dispatch(startLoading());
  return await axios.get(`${baseUrl}accounting/purchase-list/`)
    .then((resp) => {
        console.log(resp.data);
      dispatch(getPurchaseListFunc(resp.data));
    })
    .catch((err) => {
      console.log(err);
    }).finally(() => {
      dispatch(stopLoading());
    });;
};
