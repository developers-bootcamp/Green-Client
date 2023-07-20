import React, { useState, useEffect } from 'react';
import axios, { AxiosInstance } from 'axios';
import Loader from './Loader';

const GlobalLoader: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const axiosInstance: AxiosInstance = axios.create();

  //
  useEffect(() => {
    // Add request interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        setLoading(true);
        return config;
      },
      (error) => {
        setLoading(false);
        return Promise.reject(error);
      }
    );

    // Add response interceptor
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

    // Clean up interceptors
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return loading ? <Loader /> : null;
};


export default GlobalLoader;