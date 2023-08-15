import axios from 'axios';
import { setLoading } from '../redux/slices/LoadingSlice'


const axiosInstance =(store:any)=>{
      
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
