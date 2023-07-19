import React, { useState, useEffect } from 'react';
import Axios, { AxiosInstance } from 'axios';
import Loader from './Loader';

    

export const axiosInterceptor =(store:any)=>{
    const [loading, setLoading] = useState(false);
    const axiosInstance: AxiosInstance = axios.create();

    Axios.intercepter.response.use(
        (next)=>{
            setLoading(true);
            return next;
          },
          (error) => {
            setLoading(false);
            return Promise.reject(error);
          }
        );
        const responseInterceptor = axiosInstance.interceptors.response.use(
            (response) => {
              setLoading(false);
              return response;
            },
            (error) => {
              setLoading(false);
              return Promise.reject(error);
            }
          );
  return () => {
    axiosInstance.interceptors.request.eject(requestInterceptor);
    axiosInstance.interceptors.response.eject(responseInterceptor);
  };


return loading ? <Loader /> : null;
};
