import axios from "axios";
import { baseUrl } from "../../mainApi/MainApi";
import { startLoading, stopLoading } from "../../redux/slices/loaderSlice";
import toast from "react-hot-toast";
import { closeSaleUpdateModalFunc, getSaleListFunc, getSalesListFunc } from "../../redux/slices/admin/salesSlice";

export const getSalesList = (page = 1, search = '', min = '', max = '', start_date = "", end_date = "") => async (dispatch) => {
  // dispatch(startLoading());
  try {
    const params = new URLSearchParams();

    if (page) params.append("page", page);
    if (search) params.append("search", search);
    if (min) params.append("min_total_amount", min);
    if (max) params.append("max_total_amount", max);
    if (start_date) params.append("start_date", start_date);
    if (end_date) params.append("end_date", end_date);

    const resp = await axios.get(`${baseUrl}accounting/salelist-list/?${params.toString()}`);

    dispatch(getSalesListFunc(resp.data));
  } catch (err) {
    console.error(err);
  } finally {
    // dispatch(stopLoading());
  }
};


export const getSaleList = () => async (dispatch) => {
  dispatch(startLoading());
  return await axios.get(`${baseUrl}accounting/sale-list/`)
    .then((resp) => {
        console.log(resp.data);
      dispatch(getSaleListFunc(resp.data));
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



export const deleteSale = (id,navigate) => async (dispatch) => {
  dispatch(startLoading());
  return await axios.delete(`${baseUrl}accounting/sale-retrieve-update-delete/${id}/`,{
    headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
  })
    .then((resp) => {
        console.log(resp);
        toast.success("Məhsul satışı silindi");
        navigate("/sales")
        dispatch(closeSaleUpdateModalFunc())
        
    })
    .catch((err) => {
      console.log(err);
       toast.error("Xəta baş verdi. Zəhmət olmasa yenidən yoxlayın ❌");
    }).finally(() => {
      dispatch(stopLoading());
    });;
};


export const updateSale = (data,id,navigate) => async (dispatch) => {
  dispatch(startLoading());
  return await axios.put(`${baseUrl}accounting/sale-retrieve-update-delete/${id}/`,data,{
    headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
  })
    .then((resp) => {
        console.log(resp);
        toast.success("Məhsul satışı yeniləndi");
       
    })
    .catch((err) => {
      console.log(err);
       toast.error("Xəta baş verdi. Zəhmət olmasa yenidən yoxlayın ❌");
    }).finally(() => {
      dispatch(stopLoading());
    });;
};

export const updateSaleStatus = (data,id,navigate) => async (dispatch) => {
  dispatch(startLoading());
  return await axios.patch(`${baseUrl}accounting/sale-retrieve-update-delete/${id}/`,data,{
    headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
  })
    .then((resp) => {
        console.log(resp);
        toast.success("Status yeniləndi");
        navigate("/sales")
    })
    .catch((err) => {
      console.log(err);
       toast.error("Xəta baş verdi. Zəhmət olmasa yenidən yoxlayın ❌");
    }).finally(() => {
      dispatch(stopLoading());
    });;
};



export const deleteSalesComp = (id,navigate) => async (dispatch) => {
  dispatch(startLoading());
  return await axios.delete(`${baseUrl}accounting/salelist-delete/${id}/`,{
    headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
  })
    .then((resp) => {
        console.log(resp);
        toast.success("Məhsul satışı silindi");
        navigate("/sales")
        dispatch(closeSaleUpdateModalFunc())
        
    })
    .catch((err) => {
      console.log(err);
       toast.error("Xəta baş verdi. Zəhmət olmasa yenidən yoxlayın ❌");
    }).finally(() => {
      dispatch(stopLoading());
    });;
};



export const updateSaleCommon = (data,id,navigate) => async (dispatch) => {
  dispatch(startLoading());
  return await axios.put(`${baseUrl}accounting/salelist-update/${id}/`,data,{
    headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
  })
    .then((resp) => {
        console.log(resp);
        toast.success("Satış məlumatı uğurla dəyişdirildi");
        navigate("/sales")
    })
    .catch((err) => {
      console.log(err);
       toast.error("Xəta baş verdi. Zəhmət olmasa yenidən yoxlayın ❌");
    }).finally(() => {
      dispatch(stopLoading());
    });;
};
