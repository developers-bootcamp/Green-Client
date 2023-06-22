import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/landingPage';
import Login from './components/login';
import SignUp from './components/signUp';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} /> */}
      </Routes>
    </div>
  );
}

export default App;
