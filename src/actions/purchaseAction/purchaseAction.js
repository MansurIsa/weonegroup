import axios from "axios";
import { baseUrl } from "../../mainApi/MainApi";
import { startLoading, stopLoading } from "../../redux/slices/loaderSlice";
import toast from "react-hot-toast";
import { closePurchaseUpdateModalFunc, getPurchaseListFunc, getPurchaseListListFunc, getPurchaseSupplierObjFunc } from "../../redux/slices/admin/purchaseSlices";

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


// export const addPurchase = (data,navigate) => async (dispatch) => {
//   dispatch(startLoading());
//   return await axios.post(`${baseUrl}accounting/purchase-create/`,data,{
//     headers: {
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         }
//   })
//     .then((resp) => {
//         console.log(resp);
//         toast.success("Alış uğurla edildi");
//         navigate("/purchase")
//     })
//     .catch((err) => {
//       console.log(err);
//        toast.error("Xəta baş verdi. Zəhmət olmasa yenidən yoxlayın ❌");
//     }).finally(() => {
//       dispatch(stopLoading());
//     });;
// };


export const addPurchase = (data,navigate) => async (dispatch) => {
  dispatch(startLoading());
  return await axios.post(`${baseUrl}accounting/bulk-purchase/`,data,{
    headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
  })
    .then((resp) => {
        console.log(resp);
        toast.success("Alış uğurla edildi");
        navigate("/purchase")
    })
    .catch((err) => {
      console.log(err);
       toast.error("Xəta baş verdi. Zəhmət olmasa yenidən yoxlayın ❌");
    }).finally(() => {
      dispatch(stopLoading());
    });;
};

export const deletePurchase = (id,navigate) => async (dispatch) => {
  dispatch(startLoading());
  return await axios.delete(`${baseUrl}accounting/purchase-retrieve-update-delete/${id}/`,{
    headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
  })
    .then((resp) => {
        console.log(resp);
        toast.success("Alış uğurla silindi");
        navigate("/purchase")
        dispatch(closePurchaseUpdateModalFunc())
    })
    .catch((err) => {
      console.log(err);
       toast.error("Xəta baş verdi. Zəhmət olmasa yenidən yoxlayın ❌");
    }).finally(() => {
      dispatch(stopLoading());
    });;
};


export const updatePurchase = (data,id,navigate) => async (dispatch) => {
  dispatch(startLoading());
  return await axios.put(`${baseUrl}accounting/purchase-retrieve-update-delete/${id}/`,data,{
    headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
  })
    .then((resp) => {
        console.log(resp);
        toast.success("Alış məlumatı uğurla dəyişdirildi");
        navigate("/purchase")
    })
    .catch((err) => {
      console.log(err);
       toast.error("Xəta baş verdi. Zəhmət olmasa yenidən yoxlayın ❌");
    }).finally(() => {
      dispatch(stopLoading());
    });;
};



export const getPurchaseListList = () => async (dispatch) => {
  dispatch(startLoading());
  return await axios.get(`${baseUrl}accounting/purchaselist-list/`)
    .then((resp) => {
        console.log(resp.data);
      dispatch(getPurchaseListListFunc(resp.data));
    })
    .catch((err) => {
      console.log(err);
    }).finally(() => {
      dispatch(stopLoading());
    });;
};


export const getPurchaseSupplierObj = (id) => async (dispatch) => {
  dispatch(startLoading());
  return await axios.get(`${baseUrl}accounting/purchaselist-retrieve/${id}/`)
    .then((resp) => {
        console.log(resp.data);
      dispatch(getPurchaseSupplierObjFunc(resp.data));
    })
    .catch((err) => {
      console.log(err);
    }).finally(() => {
      dispatch(stopLoading());
    });;
};



export const deletePurchaseComp = (id,navigate) => async (dispatch) => {
  dispatch(startLoading());
  return await axios.delete(`${baseUrl}accounting/purchaselist-delete/${id}/`,{
    headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
  })
    .then((resp) => {
        console.log(resp);
        toast.success("Alış uğurla silindi");
        navigate("/purchase")
        dispatch(closePurchaseUpdateModalFunc())
    })
    .catch((err) => {
      console.log(err);
       toast.error("Xəta baş verdi. Zəhmət olmasa yenidən yoxlayın ❌");
    }).finally(() => {
      dispatch(stopLoading());
    });;
};