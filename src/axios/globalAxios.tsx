import axios from 'axios';
import { LOG_IN } from "../config/config"
import { setLoading } from '../redux/slices/loadingSlice'; 
import { ErrorModel } from '../components/globalErrorModel/ErrorModel';
import { setError } from '../redux/slices/errorSlice';

const  AxiosInstance =(store:any)=>{

axios.interceptors.request.use(
  (config: any) => {
    console.log("config:", config);
    console.log("configURL:", config.url);
    debugger;
    let token = localStorage.getItem("token");
    if (config.url && config.url.indexOf(LOG_IN) === -1 && token) {
      config.headers["Authorization"] = token;
    }

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);


const requestInterceptor= axios.interceptors.request.use(
 (next)=> {
  console.log("in requestInterceptor seting Loading to true")
    store.dispatch(setLoading(true))
    return next;
  },
);

const responseInterceptor=axios.interceptors.response.use(
  (next)=> {
    console.log("in responseInterceptor seting Loading to false");
    store.dispatch(setLoading(false))
    return Promise.resolve(next);
  },
   (error) => {
    console.log("in error globalaxiossssss");
    console.log(error);
    store.dispatch(setLoading(false))
    if(error.response?.status == 500)
    {
      if (error.response.data && error.response.data.message) {
        store.dispatch(setError(error.response.data.message));
        return;
      } else {
        store.dispatch(setError("An error occurred!"));
        return
      }
    }
    return Promise.reject(error);
  }
   
);



return () => {
  axios.interceptors.request.eject(requestInterceptor);
  axios.interceptors.response.eject(responseInterceptor);
};
}
export default AxiosInstance;
