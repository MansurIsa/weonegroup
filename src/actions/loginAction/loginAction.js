import axios from "axios";
import { baseUrl } from "../../mainApi/MainApi";
import toast from "react-hot-toast";

// navigate parametri əlavə olunur
export const postLogin = (data, navigate) => async () => {
  try {
    const loginResp = await axios.post(`${baseUrl}token/`, data);

    if (loginResp.data.access) {
      const accessToken = loginResp.data.access;
      toast.success("Daxil olundu ✅");
      localStorage.setItem("accessToken", accessToken)

      // access token-lə user məlumatlarını götür
      const userResp = await axios.get(`${baseUrl}user/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const user = userResp.data;
      console.log("İstifadəçi:", user);

      if (user.is_staff || user.is_superuser) {
        navigate("/dashboard");
      } else {
        navigate("/products");
      }
    }
  } catch (err) {
    console.log(err);
    toast.error("Xəta baş verdi. Zəhmət olmasa yenidən yoxlayın ❌");
    console.log(data);
    
  }
};
