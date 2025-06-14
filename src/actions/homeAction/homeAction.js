import axios from "axios";
import { baseUrl } from "../../mainApi/MainApi";
import { getBannerListFunc, getSettingsListFunc, getSocialListFunc } from "../../redux/slices/homeSlices";

export const getSettingsList = () => async (dispatch) => {
//   dispatch(isLoading());
  return await axios.get(`${baseUrl}settings/`)
    .then((resp) => {
        console.log(resp.data);
        
    //   dispatch(stopLoading());
      dispatch(getSettingsListFunc(resp.data));
    })
    .catch((err) => {
      console.log(err);
    //   dispatch(stopLoading());
    });
};


export const getBannerList = () => async (dispatch) => {
//   dispatch(isLoading());
  return await axios.get(`${baseUrl}banner-list/`)
    .then((resp) => {
        console.log(resp.data);
        
    //   dispatch(stopLoading());
      dispatch(getBannerListFunc(resp.data));
    })
    .catch((err) => {
      console.log(err);
    //   dispatch(stopLoading());
    });
};


export const getSocialList = () => async (dispatch) => {
//   dispatch(isLoading());
  return await axios.get(`${baseUrl}socialmedia-list/`)
    .then((resp) => {
        console.log(resp.data);
        
    //   dispatch(stopLoading());
      dispatch(getSocialListFunc(resp.data));
    })
    .catch((err) => {
      console.log(err);
    //   dispatch(stopLoading());
    });
};