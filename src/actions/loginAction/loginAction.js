import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "../../mainApi/MainApi";
import { startLoading, stopLoading } from "../../redux/slices/loaderSlice";
import { getUserObjFunc } from "../../redux/slices/loginSlices";

export const postLogin = (data, navigate) => async (dispatch) => {
  try {
    dispatch(startLoading());

    // 1. Login istəyi atılır
    const loginResp = await axios.post(`${baseUrl}token/`, data);

    // 2. Access token varsa
    if (loginResp.data.access) {
      const accessToken = loginResp.data.access;
      toast.success("Daxil olundu");

      // 3. Token localStorage-a yazılır
      localStorage.setItem("accessToken", accessToken);

      // 4. Token ilə user məlumatları çəkilir
      const userResp = await axios.get(`${baseUrl}user/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const user = userResp.data;
      console.log("İstifadəçi:", user);

      // 5. Rolu görə yönləndir
      if (user.is_staff || user.is_superuser) {
        navigate("/dashboard");
      } else {
        navigate("/products");
      }
    }
  } catch (err) {
    console.error("Login error:", err);
    toast.error("Xəta baş verdi. Zəhmət olmasa yenidən yoxlayın ❌");
  } finally {
    dispatch(stopLoading());
  }
};


export const getUserObj = () => async (dispatch) => {
  dispatch(startLoading());
  return await axios.get(`${baseUrl}user/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }
  })
    .then((resp) => {
      console.log(resp.data);
      dispatch(getUserObjFunc(resp.data));
    })
    .catch((err) => {
      console.log(err);
    }).finally(() => {
      dispatch(stopLoading());
    });;
};