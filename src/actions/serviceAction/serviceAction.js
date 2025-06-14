import axios from "axios";
import { baseUrl } from "../../mainApi/MainApi";
import { getMissionListFunc, getServicesListFunc } from "../../redux/slices/servicesSlices";

export const getServicesList = () => async (dispatch) => {
//   dispatch(isLoading());
  return await axios.get(`${baseUrl}service-list/`)
    .then((resp) => {
        console.log(resp.data);
        
    //   dispatch(stopLoading());
      dispatch(getServicesListFunc(resp.data));
    })
    .catch((err) => {
      console.log(err);
    //   dispatch(stopLoading());
    });
};

export const getMissionList = () => async (dispatch) => {
//   dispatch(isLoading());
  return await axios.get(`${baseUrl}mission-list/`)
    .then((resp) => {
        console.log(resp.data);
        
    //   dispatch(stopLoading());
      dispatch(getMissionListFunc(resp.data));
    })
    .catch((err) => {
      console.log(err);
    //   dispatch(stopLoading());
    });
};