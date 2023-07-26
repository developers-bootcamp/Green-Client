import axios from 'axios';
import { LOG_IN } from "../config/config"
import { setLoading } from '../redux/redux/appSlice'


const axiosInstance =(store:any)=>{

axios.interceptors.request.use(
    (config: any) => {
        debugger
        let token = localStorage.getItem("token");
        if (config.url.indexOf(LOG_IN) !== 0 && token) {
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
   return store.dispatch(setLoading(true))
  },
   (error) =>{
    return Promise.reject(error);
  }
);

const responseInterceptor=axios.interceptors.response.use(
  (next)=> {
    return store.dispatch(setLoading(false))
   },
    (error) =>{
     return Promise.reject(error);
   }
);

return () => {
  axios.interceptors.request.eject(requestInterceptor);
  axios.interceptors.response.eject(responseInterceptor);
};
}
export default axiosInstance;
