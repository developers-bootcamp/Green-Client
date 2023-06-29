import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/signUp/SignUp';
import LandingPage from './pages/landingPage/LandingPage';
import Login from './pages/login/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
      </Routes>
      <SignUp />
    </div>
  );
}

export default App;
