import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/signUp/SignUp';
import Login from './pages/login/Login';
import { Provider } from 'react-redux';
import { Reducer, createStore } from 'redux';
import Loader from './components/globalLoader/Loader';
import TabsComponent from './pages/landingPage/TabsComponent';
import LandingPage from './pages/landingPage/LandingPage';
import { ErrorModel } from './components/globalErrorModel/ErrorModel';
import AxiosInstance from './axios/globalAxios';

function App() {


  const rootReducer: Reducer<any, any> = (state = {}, action) => {
    switch (action.type) {
      default:
        return state;
    }
  };

  const store = createStore(rootReducer);
  useEffect(() => {
    const cleanupAxios = AxiosInstance(store);

    // return () => {
    //   cleanupAxios(); // Cleanup Axios interceptors when the component is unmounted
    // };
  }, []);
  return (
    <Provider store={store}>
      <div className="App">
        {<ErrorModel></ErrorModel>}
        {<Loader />}
        <Routes>
          <Route path="/" element={<TabsComponent/>} />
          <Route path="/landingPage" element={<LandingPage/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/tabsComponent" element={<TabsComponent/>} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
