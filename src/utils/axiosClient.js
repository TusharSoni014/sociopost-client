import axios from "axios";
import {
  getItem,
  KEY_ACCESS_TOKEN,
  removeItem,
  setItem,
} from "./localStorageManager";
import store from "../redux/store";
import { setLoading, showToast } from "../redux/slices/appConfigSlice";
import { TOAST_ERROR } from "../App";

let baseURL = 'http://localhost:4000'
if(process.env.NODE_ENV === 'production'){
  baseURL=process.env.REACT_APP_SERVER_BASE_URL
}

export const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
});

axiosClient.interceptors.request.use((request) => {
  const accessToken = getItem(KEY_ACCESS_TOKEN);
  request.headers["Authorization"] = `Bearer ${accessToken}`;

  store.dispatch(setLoading(true)); //handling loading in request
  //jb bhi koi request aaegi to loading true

  return request;
});

axiosClient.interceptors.response.use(
  async (response) => {
    store.dispatch(setLoading(false)); //handling loading in request
    //jb bhi koi request aaegi to loading false

    const data = response.data; // axios data for orignal backend response
    if (data.status === "ok") {
      return data;
    }

    const orignalRequest = response.config; //for orignal requested url
    const statusCode = data.statusCode;
    const error = data.message;

    store.dispatch(
      showToast({
        type: TOAST_ERROR,
        message: error,
      })
    );

    // when refresh token expires, accesstoken will be removed from localstorage and user will be redirected to login page.
    if (statusCode === 401 && orignalRequest.url === "/auth/refresh") {
      removeItem(KEY_ACCESS_TOKEN);
      window.location.replace("/login", "_self");
      return Promise.reject(error);
    }
    if (statusCode === 401) {
      const response = await axiosClient.get("/auth/refresh");

      if (response.status === "ok") {
        setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
        orignalRequest.headers[
          "Authorization"
        ] = `Bearer ${response.result.accessToken}`;
        return axios(orignalRequest);
      } else {
        removeItem(KEY_ACCESS_TOKEN);
        window.location.replace("/login", "_self");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
  async (error) => {
    store.dispatch(setLoading(false)); //handling loading in request
    //jb bhi koi request aaegi to loading false

    store.dispatch(
      showToast({
        type: TOAST_ERROR,
        message: error.message,
      })
    );
  }
);
