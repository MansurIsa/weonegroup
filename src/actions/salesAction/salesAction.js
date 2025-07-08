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




export const addSale = (data,navigate) => async (dispatch) => {
  dispatch(startLoading());
  return await axios.post(`${baseUrl}accounting/bulk-sale/`,data,{
    headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
  })
    .then((resp) => {
        console.log(resp);
        toast.success("Məhsul satışı icra olundu");
        navigate("/sales")
    })
    .catch((err) => {
      console.log(err);
       toast.error("Xəta baş verdi. Zəhmət olmasa yenidən yoxlayın ❌");
    }).finally(() => {
      dispatch(stopLoading());
    });;
};
