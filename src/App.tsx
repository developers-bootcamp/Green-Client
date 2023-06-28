import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUp from './components/signUp';
import LandingPage from './components/landingPage';
import Login from './components/login';

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
