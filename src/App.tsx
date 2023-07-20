import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/signUp/SignUp';
import LandingPage from './pages/landingPage/LandingPage';
import Login from './pages/login/Login';
import { Provider } from 'react-redux';
import { Reducer, createStore } from 'redux';
import Loader from './components/globalLoader/Loader';

function App() {
  // const [isLoading, setIsLoading] = useState(false);

  // const startLoading = () => {
  //   setIsLoading(true);
  // };

  // const stopLoading = () => {
  //   setIsLoading(false);
  // };

  const rootReducer: Reducer<any, any> = (state = {}, action) => {
    switch (action.type) {
      default:
        return state;
    }
  };

  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <div className="App">
        {<Loader />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/landingPage" element={<LandingPage />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
