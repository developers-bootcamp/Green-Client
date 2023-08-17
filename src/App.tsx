import React, { useEffect } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router';
import SignUp from './pages/signUp/SignUp';
import Login from './pages/login/Login';
import Loader from './components/globalLoader/Loader';
import TabsComponent from './pages/landingPage/TabsComponent';
import LandingPage from './pages/landingPage/LandingPage';
import { useAppDispatch } from './redux/store';
import { setCurrencies } from './redux/slices/currencySlice';
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

  return (
    <div className="App">
      {<Loader />}
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/landingPage" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tabsComponent" element={<TabsComponent />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
