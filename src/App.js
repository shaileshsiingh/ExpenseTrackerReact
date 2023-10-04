// import { useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter
import Authentication from './components/Authentication';
import Home from './components/Home';
import { AuthContextProvider } from './store/auth-context';
import CompleteProfile from './components/CompleteProfile';
import ForgotPassword from './components/Resetpw';
import { useSelector } from 'react-redux';


function App() {
  const isAuth=useSelector(state=>state.auth.isAthenticated);

  return (
    <div className="App">
      <AuthContextProvider>
        <Router> 
          <Routes>
          <Route path="/" element= {<Home />}/>
{!isAuth&&<Route path="/authentication" element={<Authentication />} />}
{isAuth&&<Route path="/completeprofile" element={<CompleteProfile />} />}

          <Route path='/reset' element={<ForgotPassword />}/>
          </Routes>
        </Router>
      </AuthContextProvider>

    </div>
  );
}

export default App;
