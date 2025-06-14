import axios from "axios";
import { baseUrl } from "../../mainApi/MainApi";
import { getActivityListFunc, getAdvantageListFunc } from "../../redux/slices/aboutSlices";

export const getAdvantageList = () => async (dispatch) => {
//   dispatch(isLoading());
  return await axios.get(`${baseUrl}advantage-list/`)
    .then((resp) => {
        console.log(resp.data);
        
    //   dispatch(stopLoading());
      dispatch(getAdvantageListFunc(resp.data));
    })
    .catch((err) => {
      console.log(err);
    //   dispatch(stopLoading());
    });
};


export const getActivityList = () => async (dispatch) => {
//   dispatch(isLoading());
  return await axios.get(`${baseUrl}activity-list/`)
    .then((resp) => {
        console.log(resp.data);
        
    //   dispatch(stopLoading());
      dispatch(getActivityListFunc(resp.data));
    })
    .catch((err) => {
      console.log(err);
    //   dispatch(stopLoading());
    });
};