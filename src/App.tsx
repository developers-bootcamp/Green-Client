import React, { useEffect, useState } from 'react';

import './App.css';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router';
import SignUp from './pages/signUp/SignUp';
import Login from './pages/login/Login';
import Loader from './components/globalLoader/Loader';
import TabsComponent from './pages/landingPage/TabsComponent';
import LandingPage from './pages/landingPage/LandingPage';
import { ErrorModel } from './components/globalErrorModel/ErrorModel';
import AxiosInstance from './axios/globalAxios';
import {store} from './redux/store';
import { useAppDispatch } from './redux/store';
import { setCurrencies } from './redux/slices/CurrencySlice';
import { getCurrencies } from './apiCalls/currencyCalls';
function App() {

  const dispatch = useAppDispatch()

  const getCurrenciesAsync = async () => {
    await getCurrencies().then(res => {
      dispatch(setCurrencies(res.data));
    });
  }


  useEffect(() => {
    getCurrenciesAsync();
  }, []);

  useEffect(() => {
    const cleanupAxios = AxiosInstance(store);
    // return () => {
    //   cleanupAxios(); // Cleanup Axios interceptors when the component is unmounted
    // };
  }, []);
  return (
      <div className="App">

        {<ErrorModel></ErrorModel>}
        {<Loader />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/landingPage" element={<LandingPage/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/tabsComponent" element={<TabsComponent/>} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </div>

  );
}

export default App;
